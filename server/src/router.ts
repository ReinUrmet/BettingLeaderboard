import { Router } from 'express';
import { getCustomers } from './db/queries/customer';

export const router = Router();

router.get('/customers', async (req, res) => {
    const customers = await getCustomers();
    res.json(customers);
});
