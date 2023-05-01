import Artist from '../../models/artist';

function displayAllView(artists: Artist[]): void {
  console.log("Here's your favorite artists:\n");
  artists.forEach((artist, index) => console.log(` -- ${index + 1} -- ${artist.name}`));
  console.log('\n');
}

export default displayAllView;
