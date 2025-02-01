import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule
import { LoggerService } from '../../services/logger.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-list',
  standalone: true,  // Marca este componente como standalone
  imports: [CommonModule],  // Asegúrate de agregar CommonModule aquí
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {
  events: Event[] = [];
  eventsCount = { log: 0, warm: 0, error: 0 };

  constructor(private loggerService: LoggerService) {}

  ngOnInit(): void {
    this.events = this.loggerService.getEvents();
    this.updateEventCount();
  }

  updateEventCount(): void {
    this.eventsCount.log = this.events.filter(event => event.category === 'log').length;
    this.eventsCount.warm = this.events.filter(event => event.category === 'warm').length;
    this.eventsCount.error = this.events.filter(event => event.category === 'error').length;
  }

  onFilterCategory(category: string): void {
    this.events = this.loggerService.getEvents().filter(event => event.category === category);
    this.updateEventCount();
  }
}
