import Artist from '../../models/artist';

import jsonData from '../../data/artists.json';

const getAll = (): Artist[] => jsonData;

export default getAll;
