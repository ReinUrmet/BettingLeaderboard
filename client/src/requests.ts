import type { DatabaseCustomer } from "./types";

export async function fetchCustomers(): Promise<DatabaseCustomer[]> {
    try {
        const customers = await fetch('http://localhost:3000/customers', { method: 'GET' })
        return customers.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}