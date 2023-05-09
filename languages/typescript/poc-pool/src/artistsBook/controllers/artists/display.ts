import getAll from '../../repositories/artists/get';

import { displayAll as viewDisplayAll } from '../../views/artists/display';

function displayAll() {
  const artists = getAll();
  viewDisplayAll(artists);
}

export default displayAll;
