export interface User {
	loginId: number;
	firstName: string;
	lastName: string;
	email: string;
	contactNumber: string;
	photos: Photo[];
	image: string;
}

export interface RegisterUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	contactNumber: string;
}

export interface LoginUser {
	username: string;
	password: string;
}

export interface Photo {
	id: number;
	isMain: boolean;
	publicId: string;
	url: string;
}

export interface Forgot {
	password: string;
}
