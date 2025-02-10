import { Injectable } from '@angular/core';
import {Event} from '../model/event.model';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private eventsKey= 'events';

  constructor() { }

  getEvents(): Event[]{
    const events = localStorage.getItem(this.eventsKey);
    return events ? JSON.parse(events):[];
  }

  addEvent(event: Event): void{
    const events = this.getEvents();
    events.push(event);
    localStorage.setItem(this.eventsKey, JSON.stringify(events));
  }

  filterEvents(classification: 'log' | 'warn' | 'error'): Event[] {
    const events = this.getEvents();
    return events.filter(event => event.classification === classification);
  }
}
