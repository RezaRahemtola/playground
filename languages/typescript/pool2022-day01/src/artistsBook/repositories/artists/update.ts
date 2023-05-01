import fs from 'fs';

import Artist from '../../models/artist';
import getAll from './get';

function update(name: string, newName: string, callback: (found: boolean, err: NodeJS.ErrnoException) => void) {
  const artists = getAll();
  const newArtists = artists.map((artist) => {
    if (artist.name === name) {
      artist.name = newName;
    }
    return artist;
  });

  if (artists.find((artist) => artist.name === name)) {
    callback(true, null);
    return;
  }

  fs.writeFile('./src/artistsBook/data/artists.json', JSON.stringify(newArtists), (err) => {
    callback(false, err);
  });
}

export default update;
