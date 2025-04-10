import { db } from '../knex';

//See funktsioon siis fetchib basic customer data, aga on hea practice vähemalt internetti sõnul, et hoida see
//ja tuleb luua veel üks endpoint andmete töötlemiseks
export const getCustomers = () => db('customer').select('*');