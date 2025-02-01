export class Event {
    id: number;
    employee: string;
    client: string;
    date: Date;
    title: string;
    description: string;
    category: 'log' | 'warm' | 'error';
    createdDate: Date;
  
    constructor(
      id: number,
      employee: string,
      client: string,
      title: string,
      description: string,
      category: 'log' | 'warm' | 'error'
    ) {
      this.id = id;
      this.employee = employee;
      this.client = client;
      this.title = title;
      this.description = description;
      this.category = category;
      this.date = new Date();
      this.createdDate = new Date();
    }
  }
  