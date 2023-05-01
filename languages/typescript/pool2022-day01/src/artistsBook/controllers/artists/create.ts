import askName from '../../views/artists/ask';
import createArtist from '../../repositories/artists/create';

async function create(): Promise<void> {
  console.log("What's the artist's name?\n");
  const name = await askName();
  createArtist(name, (found, err) => {
    if (err) {
      console.error(err);
    } else if (found) {
      console.log(`${name} already exists.`);
    } else {
      console.log(`${name} has been added to your favorite artists!`);
    }
  });
}

export default create;
