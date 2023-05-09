import prompts from 'prompts';

async function askString(message: string): Promise<string> {
  const response = await prompts({
    type: 'text',
    name: 'value',
    message,
  });

  return response.value;
}

async function askNumber(message: string): Promise<number> {
  const response = await prompts({
    type: 'number',
    name: 'value',
    message,
    validate: (value: number) => (value < 0 ? 'Entrez un nombre positif' : true),
  });

  return response.value;
}

async function askName() {
  const name = await askString("Entrez le nom de l'artiste");
  return name;
}

async function askNewName() {
  const newName = await askString("Entrez le nouveau nom de l'artiste");
  return newName;
}

async function askMostPopularMusic() {
  const mostPopularMusic = await askString('Quel est sa musique la plus populaire ?');
  return mostPopularMusic;
}

async function askNewMostPopularMusic() {
  const mostPopularMusic = await askString('Quel est sa nouvelle musique la plus populaire ?');
  return mostPopularMusic;
}

async function askNbFans() {
  const nbFans = await askNumber('Quel est son nombre de fans ?');
  return nbFans;
}

async function askNewNbFans() {
  const nbFans = await askNumber('Quel est son nouveau nombre de fans ?');
  return nbFans;
}

async function askListenTime() {
  const listenTime = await askNumber("Combien de temps (en secondes) avez-vous passé à l'écouter ?");
  return listenTime;
}

async function askNewListenTime() {
  const listenTime = await askNumber("Entrez le nouveau temps (en secondes) que vous avez passé à l'écouter");
  return listenTime;
}

export {
  askName,
  askNewName,
  askMostPopularMusic,
  askNewMostPopularMusic,
  askNbFans,
  askNewNbFans,
  askListenTime,
  askNewListenTime,
};
