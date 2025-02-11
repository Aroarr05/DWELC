import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { Event } from '../../model/event.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  selectedClassification: 'log' | 'warn' | 'error' | null = null; 

  constructor(private loggerService: LoggerService) {}

  ngOnInit(): void {
    this.loadEvents(); 
  }

  
  loadEvents(classification?: 'log' | 'warn' | 'error'): void {

    this.events = this.loggerService.getEvents();


    if (classification) {
      this.filteredEvents = this.loggerService.filterEvents(classification);
      this.selectedClassification = classification; 
    } else {
      this.filteredEvents = [...this.events];
    }
  }


  filterEvents(classification: 'log' | 'warn' | 'error'): void {
   
    if (this.selectedClassification === classification) {
      return;
    }

    this.loadEvents(classification);
  }

  resetFilter(): void {
    this.selectedClassification = null;
    this.loadEvents(); 
  }
}
