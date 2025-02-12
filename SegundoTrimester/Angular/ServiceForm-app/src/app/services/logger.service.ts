import { Injectable } from '@angular/core';
import { EventService } from './event.service';  
import { EventM } from '../model/event.model';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private eventService: EventService) {}

  addEvent(event:EventM) {
    this.eventService.addEvent(event);  
  }

  filterEvents(classification: 'log' | 'warn' | 'error') {
    return this.eventService.filterEvents(classification);  
  }

  getEvents() {
    return this.eventService.getEvents();  
  }
}
