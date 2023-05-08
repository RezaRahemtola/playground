import { Artist } from 'types/artist';
import { backendApi } from '.';

export type CreateArtistBody = {
	name: string;
	rating: number;
	nationality: string;
	musicGender: string;
	photoUrl: string;
};

type GetArtistResponse = {
	artist: Artist;
};

export const getArtist = (artistId: string, accessToken: string) =>
	backendApi.get<GetArtistResponse>(`/artist/${artistId}`, { headers: { accessToken } });

export const createArtist = (data: CreateArtistBody, accessToken: string) =>
	backendApi.post<GetArtistResponse>('artist', data, { headers: { accessToken } });
