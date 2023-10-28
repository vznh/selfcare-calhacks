import MindsDB from 'mindsdb-js-sdk';


try {
  await MindsDB.connect({
    user: 'placeholder@gmail.com',
    password: 'placeholder_password!'
  });
} catch(error) {
  // Failed to authenticate.
}

//connect MindsDB to our database
const connectionParams = {
  'user': '?',
  'port': 1010101,
  'password': 'password',
  'host': '127.0.0.1',
  'database': 'lolololol'
}
try {
  const pgDatabase = await MindsDB.Databases.createDatabase(
    'psql_datasource',
    'postgres',
    connectionParams);
} catch (error) {
  // Couldn't connect to database.
}

