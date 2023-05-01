import prompts from 'prompts';

async function askName(): Promise<string> {
  const response = await prompts({
    type: 'text',
    name: 'input',
    message: '> ',
  });
  return response.input;
}

export default askName;
