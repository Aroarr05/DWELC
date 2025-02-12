import { Employee } from "./employee.model";

export interface EventM {
    id: number;
    employee: Employee;  // Relationship with the employee
    title: string;
    client: string;
    date: Date;
    description: string;
    classification: 'log' | 'warn' | 'error' | 'all';  // Event type
    creationDate: Date;  // Creation date of the event
  }
  