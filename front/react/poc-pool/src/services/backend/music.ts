import { Music } from 'types/music';
import { backendApi } from '.';

export type CreateMusicBody = {
	name: string;
	rating: number;
	url: string;
};

type CreateMusicResponse = {
	music: Music;
};

export const createMusic = (data: CreateMusicBody, artistId: string, accessToken: string) =>
	backendApi.post<CreateMusicResponse>(`/artist/${artistId}/music`, data, {
		headers: { accessToken },
	});
