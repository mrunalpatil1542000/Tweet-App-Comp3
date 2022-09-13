import { User } from "./User";

export interface ReplyResponse {
	id: number;
	userId: number;
	user: User;
	tweetId: number;
	message: string;
	datePosted: string;
}

export interface Reply {
	message: string;
}
