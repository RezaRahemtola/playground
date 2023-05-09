import fs from 'fs';

import Artist from '../../models/artist';

function getAll(): Artist[] {
  try {
    const fileData = fs.readFileSync('./src/artistsBook/data/artists.json', 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default getAll;
