export interface Response<T> {
	isSuccess: boolean;
	result: T;
	displayMessage: string;
	errorMessages?: any;
	token?: string;
}
