export interface Event {
    id: number;
    employee: string;
    client: string;
    date: Date;
    title: string;
    description: string;
    category: 'log' | 'warm' | 'error';
    createdDate: Date;
}
