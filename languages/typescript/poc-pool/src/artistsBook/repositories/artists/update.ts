import fs from 'fs';

import getAll from './get';

function update(
  name: string,
  newName: string,
  newMostPopularMusic: string,
  newNbFans: number,
  newListenTime: number,
  callback: (found: boolean, err: NodeJS.ErrnoException) => void,
) {
  const artists = getAll();

  let found = false;
  const artistsUpdated = artists.map((artist) => {
    if (artist.name === name) {
      found = true;
      return {
        ...artist,
        name: newName,
        listenTime: newListenTime,
        mostPopularMusic: newMostPopularMusic,
        nbFans: newNbFans,
      };
    }
    return artist;
  });

  if (!found) {
    callback(false, undefined);
    return;
  }

  fs.writeFile('./src/artistsBook/data/artists.json', JSON.stringify(artistsUpdated), (err) => {
    if (err) {
      callback(true, err);
    } else {
      callback(true, undefined);
    }
  });
}

export default update;
