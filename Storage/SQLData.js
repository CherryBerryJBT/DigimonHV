import {openDatabase} from 'react-native-sqlite-storage';

const database = openDatabase(
  {name: 'testdata.db', createFromLocation: 1},
  null,
  null,
);
export default database;

