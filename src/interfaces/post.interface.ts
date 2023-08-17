// Generated by https://quicktype.io

export interface Post {
	_id: string;
	title: string;
	published: boolean;
	user: User;
	createdAt: string;
	updatedAt: string;
	content: string;
	picture?: string[];
	likes?: number;
	comments?: number;
}

export interface User {
	_id: string;
	username: string;
	photoUrl: string;
}