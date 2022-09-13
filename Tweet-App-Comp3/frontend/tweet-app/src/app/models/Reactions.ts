import { User } from "./User";

export interface Reactions {
	id: number;
	tweetId: number;
	userId: number;
	user: User;
	reactions: number;
}
