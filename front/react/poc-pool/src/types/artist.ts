import { Music } from './music';

export type Artist = {
	id: string;
	name: string;
	rating: number;
	nationality: string;
	musicGender: string;
	photoUrl: string;
	musics: Music[];
};
