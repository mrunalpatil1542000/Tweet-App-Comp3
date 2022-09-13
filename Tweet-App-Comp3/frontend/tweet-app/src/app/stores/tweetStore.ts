import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { ReplyResponse } from "../models/ReplyResponse";
import { CreateTweet, Tweet } from "../models/Tweet";
import { User } from "../models/User";
import { store } from "./store";

class TweetStore {
	tweets: Tweet[] = [];
	tweetRegistry = new Map<string, Tweet>();
	selectedTweet: Tweet | undefined = undefined;
	editMode = false;
	loading = false;
	loadingInitial = true;
	userTweetLikeRegistry = new Map<number, User[]>();
	commentsRegistry = new Map<number, ReplyResponse[]>();
	loadComment: boolean = true;
	current: ReplyResponse[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	get tweetsByDate() {
		return Array.from(this.tweetRegistry.values()).sort((a, b) => {
			return Date.parse(b.datePosted) - Date.parse(a.datePosted);
		});
	}

	get groupedTweets() {
		return Object.entries(
			this.tweetsByDate.reduce((tweets, tweet) => {
				const user = tweet.user!.email;
				tweets[user] = tweets[user] ? [...tweets[user], tweet] : [tweet];
				return tweets;
			}, {} as { [key: string]: Tweet[] })
		);
	}

	get currentUserTweets() {
		return Array.from(this.tweetRegistry.values())
			.sort((a, b) => {
				return Date.parse(b.datePosted) - Date.parse(a.datePosted);
			})
			.filter((x) => x.user!.email === store.userStore.user?.email);
	}

	givenUserTweets = (username: string) => {
		return Array.from(this.tweetRegistry.values())
			.sort((a, b) => {
				return Date.parse(b.datePosted) - Date.parse(a.datePosted);
			})
			.filter((x) => x.user!.email === username);
	};

	loadAllTweets = async () => {
		try {
			const response = await agent.TweetRequest.list();
			runInAction(() => {
				if (response.isSuccess) {
					const tweetList = response.result;
					tweetList.forEach(async (tweet) => {
						this.tweetRegistry.set(tweet.id.toString(), tweet);
					});
					this.loadingInitial = false;
				} else {
					this.loadingInitial = false;
					history.push("/login");
				}
			});
		} catch (error) {
			console.log("error");
		}
	};

	createTweet = async (username: string, tweetObj: CreateTweet) => {
		this.loading = true;
		this.editMode = true;
		try {
			const response = await agent.TweetRequest.createTweet(tweetObj, username);
			runInAction(() => {
				if (response.isSuccess) {
					this.loading = false;
					this.editMode = false;
					this.tweetRegistry.set(
						response.result.id.toString(),
						response.result
					);
					this.selectedTweet = response.result;
					history.push("/profiles/" + username);
				}
				this.loading = false;
				this.editMode = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
				this.editMode = false;
			});
		}
	};

	selectTweet = async (id: number) => {
		let tweet: Tweet | undefined = this.getATweet(id);
		if (tweet) {
			this.selectedTweet = tweet;
			return tweet;
		} else {
			this.loadingInitial = true;
			try {
				var response = await agent.TweetRequest.details(id);
				runInAction(() => {
					if (response.isSuccess) {
						tweet = response.result;
						this.loadingInitial = false;
						this.selectedTweet = tweet;
						return tweet;
					}
					console.log(tweet);
				});
			} catch (error) {
				console.log(error);
				runInAction(() => {
					this.loadingInitial = false;
				});
				return tweet;
			}
		}
	};

	deleteTweet = async (username: string, id: number) => {
		this.loading = true;
		try {
			var response = await agent.TweetRequest.delete(username, id);
			runInAction(() => {
				if (response.isSuccess) this.tweetRegistry.delete(id.toString());
				this.loading = false;
			});
		} catch (error) {
			runInAction(() => {
				console.log(error);
				this.loading = false;
			});
		}
	};

	updateTweet = async (username: string, id: number, tweetObj: CreateTweet) => {
		this.loading = true;
		this.editMode = true;
		console.log(this.loading);
		try {
			var response = await agent.TweetRequest.update(username, id, tweetObj);
			runInAction(() => {
				if (response.isSuccess) {
					this.loading = false;
					this.editMode = false;
					this.tweetRegistry.set(
						response.result.id.toString(),
						response.result
					);
					this.selectedTweet = response.result;
					history.push("/profiles/" + username);
				}
				this.loading = false;
				this.editMode = false;
			});
		} catch (error) {
			runInAction(() => {
				this.loading = false;
				this.editMode = false;
			});
		}
	};

	private getATweet = (id: number) => {
		return this.tweetRegistry.get(id.toString());
	};

	loadLikeUsers = async () => {
		try {
			var response = await agent.TweetRequest.likeDetails();

			runInAction(() => {
				response.result.map((x) => {
					if (this.userTweetLikeRegistry.has(x.tweetId)) {
						this.userTweetLikeRegistry.get(x.tweetId)?.push(x.user);
					} else {
						var user1: User[] = [];
						user1.push(x.user);
						this.userTweetLikeRegistry.set(x.tweetId, user1);
					}
				});
			});
		} catch (error) {
			console.log(error);
		}
	};

	loadComments = async () => {
		try {
			var response = await agent.TweetRequest.commentDetails();
			runInAction(() => {
				this.loadComment = false;
				response.result.map((x) => {
					if (this.commentsRegistry.has(x.tweetId)) {
						this.commentsRegistry.get(x.tweetId)?.push(x);
					} else {
						var array: ReplyResponse[] = [];
						array.push(x);
						this.commentsRegistry.set(x.tweetId, array);
					}
				});
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loadComment = false;
			});
		}
	};

	loadCurrentLikes = () => {
		var users: User[] = [];

		this.userTweetLikeRegistry.get(this.selectedTweet?.id!)?.map((x) => {
			users.push(x);
		});

		return users;
	};

	loadCurrentComments = () => {
		var comments: ReplyResponse[] = [];

		this.commentsRegistry.get(this.selectedTweet?.id!)?.map((x) => {
			comments.push(x);
		});

		return comments;
	};

	postALike = async (id: number, user: User) => {
		try {
			var response = await agent.TweetRequest.postLike(id, user.email);
			runInAction(() => {
				if (response.isSuccess) {
					if (response.result === 1) {
						if (this.userTweetLikeRegistry.has(id)) {
							this.userTweetLikeRegistry.get(id)?.push(user);
						} else {
							var users: User[] = [];
							users.push(user);
							this.userTweetLikeRegistry.set(id, users);
						}
					} else if (response.result === 2) {
						var array = this.userTweetLikeRegistry.get(id);
						var x = array?.filter((x) => x.loginId !== user.loginId);
						this.userTweetLikeRegistry.set(id, x!);
					}
				}
			});
		} catch (error) {
			console.log(error);
		}
	};

	postAComment = async (message: any, user: User, id: number) => {
		try {
			var response = await agent.TweetRequest.postComment(
				id,
				user.email,
				message
			);
			runInAction(() => {
				if (response.isSuccess) {
					var reply = response.result;
					if (this.commentsRegistry.has(id)) {
						this.commentsRegistry.get(id)?.push(reply);
					} else {
						var array: ReplyResponse[] = [];
						array.push(reply);
						this.commentsRegistry.set(id, array);
					}
				}
			});
		} catch (error) {
			console.log(error);
		}
	};
}
export default TweetStore;
