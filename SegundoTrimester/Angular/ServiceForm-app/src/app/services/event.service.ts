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
    if(typeof localStorage !== 'undefined'){
      const savedEvents = localStorage.getItem('events');
      if (savedEvents) {
        this.events = JSON.parse(savedEvents);
      }
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

  // Filtrar eventos por clasificación, ahora aceptando "all"
  filterEvents(classification: 'log' | 'warn' | 'error' | 'all'): EventM[] {
    if (classification === 'all') {
      return this.events;  // Si es "all", mostrar todos los eventos
    }
    return this.events.filter(event => event.classification === classification);
  }

  // Get all events
  getEvents(): EventM[] {
    return this.events;
  }
  
}
