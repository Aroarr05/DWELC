import { Client } from "./client.model";
import { Employee } from "./employee.model";

export interface Event {
    id: number;
    employee: Employee;  
    client: Client;      
    date: Date;
    title: string;
    description: string;
    classification: 'log' | 'warm' | 'error';
    createdDate: Date;
}

