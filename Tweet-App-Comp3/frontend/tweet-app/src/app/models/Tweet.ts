import { User } from "./User";

export interface Tweet {
	id: number;
	subject: string;
	tag?: string;
	userId: number;
	user: User|null;
	datePosted: string;
}

export interface CreateTweet {
	id: number;
	subject: string;
	tag?: string;
}
