import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo, User } from "../models/User";
import { store } from "./store";

export default class ProfileStore {
	profile: User | null = null;
	loadingProfile = false;
	uploading = false;
	loading = false;
	constructor() {
		makeAutoObservable(this);
	}

	get isCurrentUser() {
		if (store.userStore.user && this.profile) {
			return store.userStore.user.email === this.profile.email;
		}
		return false;
	}

	loadProfile = async (username: string) => {
		this.loadingProfile = true;
		try {
			const response = await agent.UserRequest.search(username);
			runInAction(() => {
				this.profile = response.result[0];
				this.loadingProfile = false;
			});
		} catch (error) {}
	};

	uploadPhoto = async (file: Blob) => {
		this.uploading = true;
		try {
			const response = await agent.UserRequest.uploadPhoto(
				store.userStore.user?.email!,
				file
			);
			console.log(response.data);

			runInAction(() => {
				if (response.data.isSuccess) {
					console.log(this.profile);
					var element =
						response.data.result.photos[response.data.result.photos.length - 1];
					console.log(element);
					this.profile!.photos.push(element);
					if (element.isMain) this.profile!.image = element.url;
					console.log(this.profile);
					this.uploading = false;
				}
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.uploading = false;
			});
		}
	};

	setMainPhoto = async (photo: Photo) => {
		this.loading = true;
		try {
			await agent.UserRequest.setMainPhoto(
				store.userStore.user?.email!,
				photo.id
			);
			store.userStore.setImage(photo.url);
			runInAction(() => {
				if (this.profile && this.profile.photos) {
					this.profile.photos.find((p) => p.isMain)!.isMain = false;
					this.profile.photos.find((p) => p.id === photo.id)!.isMain = true;
					this.profile.image = photo.url;
					this.loading = false;
				}
			});
		} catch (error) {
			runInAction(() => {
				this.loading = false;
			});
			console.log(error);
		}
	};

	deletePhoto = async (photo: Photo) => {
		this.loading = true;
		try {
			await agent.UserRequest.deletePhoto(
				store.userStore.user?.email!,
				photo.id
			);
			runInAction(() => {
				if (this.profile) {
					this.profile.photos = this.profile.photos?.filter(
						(p) => p.id !== photo.id
					);
					this.loading = false;
				}
			});
		} catch (error) {
			runInAction(() => {
				this.loading = false;
			});
			console.log(error);
		}
	};
}
