import prompts from 'prompts';

import displayAll from './controllers/artists/display';
import create from './controllers/artists/create';

async function getInput(): Promise<number> {
  const response = await prompts({
    type: 'number',
    name: 'input',
    message: '> ',
    validate: (value: number) => ((value === 1 || value === 2 || value === 3) ? true : 'Please enter 1, 2 or 3'),
  });
  return response.input;
}

function displayOptions(): void {
  console.log('What do you want to do?');
  console.log('1 - List my favorite artists');
  console.log('2 - Add an artist to my favorite');
  console.log('3 - Leave\n');
}

async function router() {
  let answer = 1;

  while (answer !== 3) {
    displayOptions();
    answer = await getInput();
    if (answer === 1) {
      displayAll();
    } else if (answer === 2) {
      await create();
    }
  }
  console.log('See you !');
}

export default router;
