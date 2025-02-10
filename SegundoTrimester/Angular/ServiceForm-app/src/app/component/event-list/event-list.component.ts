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
  selectedClassification: 'log' | 'warn' | 'error' | null = null; // Para almacenar la clasificación seleccionada

  constructor(private loggerService: LoggerService) {}

  ngOnInit(): void {
    this.loadEvents(); // Cargar eventos al inicio
  }

  // Método para cargar eventos desde el servicio y aplicar filtros si es necesario
  loadEvents(classification?: 'log' | 'warn' | 'error'): void {
    // Cargar todos los eventos
    this.events = this.loggerService.getEvents();

    // Si se proporciona una clasificación, aplicar el filtro
    if (classification) {
      this.filteredEvents = this.loggerService.filterEvents(classification);
      this.selectedClassification = classification; // Guardar la clasificación seleccionada
    } else {
      // Si no hay clasificación, mostrar todos los eventos
      this.filteredEvents = [...this.events];
    }
  }

  // Filtrar eventos por clasificación
  filterEvents(classification: 'log' | 'warn' | 'error'): void {
    // Si ya está seleccionado el mismo filtro, no hacer nada
    if (this.selectedClassification === classification) {
      return;
    }

    // Llamar a loadEvents con el filtro deseado
    this.loadEvents(classification);
  }

  // Restablecer el filtro y mostrar todos los eventos
  resetFilter(): void {
    this.selectedClassification = null;
    this.loadEvents(); // Mostrar todos los eventos
  }
}
