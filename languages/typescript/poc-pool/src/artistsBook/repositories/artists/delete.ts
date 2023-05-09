import fs from 'fs';

import getAll from './get';

// cannot have `delete` function name
function deleteFunc(name: string, callback: (found: boolean, err: NodeJS.ErrnoException) => void) {
  const artists = getAll();

  const indexToDelete = artists.map((artist) => artist.name).indexOf(name);

  if (indexToDelete === -1) {
    callback(false, undefined);
    return;
  }

  artists.splice(indexToDelete, 1);

  fs.writeFile('./src/artistsBook/data/artists.json', JSON.stringify(artists), (err) => {
    if (err) {
      callback(true, err);
    } else {
      callback(true, undefined);
    }
  });
}

export default deleteFunc;
