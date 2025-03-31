import { db } from '../knex';

export const getCustomers = () => db('customer').select('*');