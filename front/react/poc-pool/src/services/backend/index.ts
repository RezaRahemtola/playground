import axios from 'axios';

import { BACKEND_URL } from 'config/services';

import { createArtist, getArtist } from './artist';
import { login, register } from './auth';
import { createMusic } from './music';
import { getUser } from './user';

const backendApi = axios.create({
	baseURL: BACKEND_URL,
	timeout: 3000,
});

const backendService = {
	auth: {
		register,
		login,
	},
	user: {
		get: getUser,
	},
	artist: {
		get: getArtist,
		create: createArtist,
	},
	music: {
		create: createMusic,
	},
};

export { backendApi };
export default backendService;
