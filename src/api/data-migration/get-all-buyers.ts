import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';
import { ApplicationBuyerMvp } from '../types';

const getAllBuyers = async (connection: Connection) => {
  const loggingMessage = 'Getting all buyers';

  const query = 'SELECT * FROM Buyer';

  const [allBuyers] = await executeSqlQuery({ connection, query, loggingMessage });

  const buyers = allBuyers as Array<ApplicationBuyerMvp>;

  return buyers;
};

export default getAllBuyers;
