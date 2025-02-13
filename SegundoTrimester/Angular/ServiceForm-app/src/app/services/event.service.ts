import { Injectable } from '@angular/core';
import { EventM } from '../model/event.model';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  private events: EventM[] = [];

  constructor() {
    this.loadEvents();
  }

  loadEvents() {
    if (typeof localStorage !== 'undefined') {
      const savedEvents = localStorage.getItem('events');
      if (savedEvents) {
        this.events = JSON.parse(savedEvents);
      }
    }
  }

  addEvent(event: EventM) {
    this.events.push(event);
    this.saveEvents();
  }

  saveEvents() {
    localStorage.setItem('events', JSON.stringify(this.events));
  }

  filterEvents(classification: 'log' | 'warn' | 'error' | 'all'): EventM[] {
    if (classification === 'all') {
      return this.events;
    }
    return this.events.filter(event => event.classification === classification);
  }

  getEvents(): EventM[] {
    return this.events;
  }

}
