import repositoryUpdate from '../../repositories/artists/update';

import { askName, askNewListenTime, askNewMostPopularMusic, askNewName, askNewNbFans } from '../../views/artists/ask';
import { displayMessageUpdated, displayMessageNotUpdated, displayMessageNotFound } from '../../views/artists/display';

async function update() {
  const name = await askName();
  const newName = await askNewName();
  const newMostPopularMusic = await askNewMostPopularMusic();
  const newNbFans = await askNewNbFans();
  const newListenTime = await askNewListenTime();

  repositoryUpdate(name, newName, newMostPopularMusic, newNbFans, newListenTime, (found, err) => {
    if (err) {
      displayMessageNotUpdated(name);
      console.error(err);
    } else if (!found) {
      displayMessageNotFound(name);
    } else {
      displayMessageUpdated(name);
    }
  });
}

export default update;
