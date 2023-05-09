import { clear } from 'console';

import prompts from 'prompts';

import create from './controllers/artists/create';
import displayAll from './controllers/artists/display';
import update from './controllers/artists/update';
import deleteFunc from './controllers/artists/delete';

function displayOptions() {
  console.log('Que souhaitez-vous faire ?');
  console.log('1 - Afficher mes artistes favoris');
  console.log('2 - Ajouter un nouvel artiste');
  console.log('3 - Modifier un artiste');
  console.log('4 - Supprimer un artiste');
  console.log('5 - Quitter');
}

async function askOption(): Promise<number> {
  const response = await prompts({
    type: 'number',
    name: 'value',
    message: '> ',
    validate: (value: number) => (value > 5 && value < 1 ? 'Entrez 1, 2, 3, 4 ou 5.' : true),
  });

  return response.value;
}

async function manageOption(option: number) {
  switch (option) {
    case 1:
      displayAll();
      break;
    case 2:
      await create();
      break;
    case 3:
      await update();
      break;
    case 4:
      await deleteFunc();
      break;
    case 5:
      return false;
    default:
      return true;
  }
  return true;
}

async function router() {
  let running = true;

  clear();
  console.log('Bienvenue dans votre Artists Book !\n');
  while (running) {
    displayOptions();

    // eslint-disable-next-line no-await-in-loop
    const option = await askOption();

    clear();
    // eslint-disable-next-line no-await-in-loop
    running = await manageOption(option);

    console.log();
  }

  clear();
  console.log('À bientôt !\n');
}

export default router;
