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

  // Load events from localStorage
  loadEvents() {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      this.events = JSON.parse(savedEvents);
    }
  }

  // Add a new event
  addEvent(event: EventM) {
    this.events.push(event);
    this.saveEvents();
  }

  // Save events to localStorage
  saveEvents() {
    localStorage.setItem('events', JSON.stringify(this.events));
  }

  // Filter events by classification
  filterEvents(classification: 'log' | 'warn' | 'error'): EventM[] {
    return this.events.filter(event => event.classification === classification);
  }

  // Get all events
  getEvents(): EventM[] {
    return this.events;
  }
}
