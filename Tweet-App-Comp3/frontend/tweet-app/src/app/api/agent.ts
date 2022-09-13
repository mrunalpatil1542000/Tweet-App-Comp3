import axios, { AxiosResponse } from "axios";
import { Reactions } from "../models/Reactions";
import { ReplyResponse } from "../models/ReplyResponse";
import { Response } from "../models/Response";
import { CreateTweet, Tweet } from "../models/Tweet";
import { Forgot, LoginUser, RegisterUser, User } from "../models/User";
import { store } from "../stores/store";

const sleep = (delay: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
};

axios.defaults.baseURL = "https://tweetappwebappmap.azurewebsites.net/api/v1/tweets";

axios.interceptors.request.use((config) => {
	const token = store.commonStore.token;
	if (token) config.headers!.Authorization = `Bearer ${token}`;
	return config;
});

axios.interceptors.response.use(async (response) => {
	try {
		await sleep(1000);
		return response;
	} catch (error) {
		console.log(error);
		return await Promise.reject(error);
	}
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
	post: <T>(url: string, body?: {}) =>
		axios.post<T>(url, body).then(responseBody),
	put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
	del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const UserRequest = {
	list: () => requests.get<Response<User[]>>("/users/all"),
	login: (creds: LoginUser) => requests.post<Response<User>>("/login", creds),
	register: (creds: RegisterUser) =>
		requests.post<Response<User>>("/register", creds),
	search: (username: string) =>
		requests.get<Response<User[]>>(`/search/${username}`),
	current: () => requests.get<Response<User>>("/currentuser"),
	uploadPhoto: (username: string, file: Blob) => {
		let formData = new FormData();
		formData.append("File", file);
		return axios.post<Response<User>>(`user/${username}/photos`, formData, {
			headers: { "Content-type": "multipart/form-data" },
		});
	},
	setMainPhoto: (username: string, id: number) =>
		requests.post(`user/${username}/photo/${id}/set-Main`),
	deletePhoto: (username: string, id: number) =>
		requests.del(`user/${username}/photo/${id}/delete`),
	forgotPassword: (username: string, forgot: Forgot) =>
		requests.post(`${username}/forgot`, forgot),
};

const TweetRequest = {
	list: () => requests.get<Response<Tweet[]>>("/all"),
	listTweetOfUser: (username: string) =>
		requests.get<Response<Tweet[]>>(`/${username}`),
	createTweet: (tweetObj: CreateTweet, username: string) =>
		requests.post<Response<Tweet>>(`/${username}/add`, tweetObj),
	details: (id: number) => requests.get<Response<Tweet>>(`/details/${id}`),
	delete: (username: string, id: number) =>
		requests.del<Response<boolean>>(`/${username}/delete/${id}`),
	update: (username: string, id: number, body: {}) =>
		requests.put<Response<Tweet>>(`/${username}/update/${id}`, body),
	likeDetails: () => requests.get<Response<Reactions[]>>(`/reactions`),
	postLike: (id: number, username: string) =>
		requests.post<Response<number>>(`/${username}/like/${id}`),
	commentDetails: () => requests.get<Response<ReplyResponse[]>>("/replies"),
	postComment: (id: number, username: string, message: any) =>
		requests.post<Response<ReplyResponse>>(`${username}/reply/${id}`, message),
};

const agent = {
	UserRequest,
	TweetRequest,
};

export default agent;
