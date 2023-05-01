import prompts from 'prompts';

async function askName(): Promise<string> {
  const response = await prompts({
    type: 'text',
    name: 'name',
    message: 'Enter your name:',
  });
  return response.name;
}

async function helloName() {
  try {
    const name = await askName();
    console.log(`Hello ${name}!`);
  } catch (error) {
    console.log(error);
  }
}

export default helloName;
