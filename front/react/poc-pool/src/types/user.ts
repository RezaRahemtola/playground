import { Artist } from './artist';

type User = {
	id: string;
	email: string;
	artists: Artist[];
};

export type { User };
