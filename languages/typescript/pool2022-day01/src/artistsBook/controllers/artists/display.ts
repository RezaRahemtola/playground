import getAll from '../../repositories/artists/get';
import displayAllView from '../../views/artists/display';

function displayAll(): void {
  const userArtists = getAll();
  displayAllView(userArtists);
}

export default displayAll;
