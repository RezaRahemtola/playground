import prompts from 'prompts';

import displayAll from './controllers/artists/display';

async function getInput(): Promise<number> {
  const response = await prompts({
    type: 'number',
    name: 'input',
    message: '> ',
    validate: (value: number) => ((value === 1 || value === 2) ? true : 'Please enter 1 or 2'),
  });
  return response.input;
}

function displayOptions(): void {
  console.log('What do you want to do?');
  console.log('1 - List my favorite artists');
  console.log('2 - Leave\n');
}
async function router() {
  let answer = 1;

  while (answer !== 2) {
    displayOptions();
    answer = await getInput();
    if (answer === 1) {
      displayAll();
    }
  }
  console.log('See you !');
}

export default router;
