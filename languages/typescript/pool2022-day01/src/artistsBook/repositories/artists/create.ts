import fs from 'fs';

import Artist from '../../models/artist';
import getAll from './get';

function createArtist(name: string, cback: (found: boolean, err: NodeJS.ErrnoException) => void) {
  const artists = getAll();
  const newArtist: Artist = { name };

  if (artists.find((artist) => artist.name === name)) {
    cback(true, null);
    return;
  }

  fs.writeFile('./src/artistsBook/data/artists.json', JSON.stringify(artists.concat(newArtist)), (err) => {
    cback(false, err);
  });
}

export default createArtist;
