import fs from 'node:fs';

import getAll from './get';

import Artist from '../../models/artist';

function create(
  name: string,
  mostPopularMusic: string,
  nbFans: number,
  listenTime: number,
  callback: (found: boolean, err: NodeJS.ErrnoException) => void,
) {
  const artists = getAll();
  const newArtist: Artist = { id: crypto.randomUUID(), name, mostPopularMusic, nbFans, listenTime };

  if (artists.find((artist) => artist.name === name)) {
    callback(true, undefined);
    return;
  }

  fs.writeFile('./src/artistsBook/data/artists.json', JSON.stringify(artists.concat(newArtist)), (err) => {
    callback(false, err);
  });
}

export default create;
