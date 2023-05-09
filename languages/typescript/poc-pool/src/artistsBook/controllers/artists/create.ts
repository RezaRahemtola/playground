import repositoryCreate from '../../repositories/artists/create';

import { askListenTime, askMostPopularMusic, askName, askNbFans } from '../../views/artists/ask';
import {
  displayMessageCreated,
  displayMessageNotCreated,
  displayMessageAlreadyExists,
} from '../../views/artists/display';

async function create() {
  const name = await askName();
  const mostPopularMusic = await askMostPopularMusic();
  const nbFans = await askNbFans();
  const listenTime = await askListenTime();

  repositoryCreate(name, mostPopularMusic, nbFans, listenTime, (found, err) => {
    if (err) {
      displayMessageNotCreated(name);
      console.error(err);
    } else if (found) {
      displayMessageAlreadyExists(name);
    } else {
      displayMessageCreated(name);
    }
  });
}

export default create;
