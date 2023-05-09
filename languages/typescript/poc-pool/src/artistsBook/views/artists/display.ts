import Artist from '../../models/artist';

function displayAll(artists: Artist[]) {
  console.log('Voici vos artistes favoris:');
  artists.forEach((artist, index) => {
    console.log(
      `-- ${index + 1} -- ${artist.name}\nnbFans: ${artist.nbFans}\nmostPopularMusic: ${
        artist.mostPopularMusic
      }\nlistenTime: ${artist.listenTime}\nid: ${artist.id}\n`,
    );
  });
}

function displayMessageAlreadyExists(name: string) {
  console.log(`${name} fait déjà partie de vos artist favoris !`);
}

function displayMessageCreated(name: string) {
  console.log(`${name} a bien été ajouté à vos artistes favoris !`);
}

function displayMessageNotCreated(name: string) {
  console.log(`${name} n'a pas pu être ajouté à vos artistes favoris...`);
}

function displayMessageUpdated(name: string) {
  console.log(`${name} a bien été modifié !`);
}

function displayMessageNotUpdated(name: string) {
  console.log(`${name} n'a pas pu être modifié...`);
}

function displayMessageNotFound(name: string) {
  console.log(`${name} ne fait pas parti de vos favoris...`);
}

function displayMessageDeleted(name: string) {
  console.log(`${name} a bien été supprimé !`);
}

function displayMessageNotDeleted(name: string) {
  console.log(`${name} n'a pas pu être supprimé...`);
}

export {
  displayAll,
  displayMessageAlreadyExists,
  displayMessageCreated,
  displayMessageNotCreated,
  displayMessageUpdated,
  displayMessageNotUpdated,
  displayMessageNotFound,
  displayMessageDeleted,
  displayMessageNotDeleted,
};
