import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Evento } from '../../model/Evento';
import { EventService } from '../../service/event.service';
import { ObservableService } from '../../service/observable.service';

@Component({
  selector: 'app-events',
  imports: [CommonModule],
  templateUrl: './events.component.html',
})
export class EventsComponent {
  
  private eventService: EventService = inject(EventService);
  private observableService: ObservableService = inject(ObservableService);
  
  listaEventos: Evento[] = [];
  
  constructor() { this.mostrarTodos(); }

  mostrarTodos() {    
    this.eventService.getAllEventos().subscribe((listaEventos: Evento[]) => { this.listaEventos = listaEventos; });
  }
  
  mostrarLogs() {
    this.eventService.getLogs().subscribe((listaLogs: Evento[]) => { this.listaEventos = listaLogs });
  }
  
  mostrarWarnings() {
    this.eventService.getWarns().subscribe((listaWarnings: Evento[]) => { this.listaEventos = listaWarnings });
  }
  
  mostrarErrores() {
    this.eventService.getErrors().subscribe((listaErrors: Evento[]) => { this.listaEventos = listaErrors });
  }

  eliminarEvento(id: string) {
    // No funciona con eventos recién añadidos, hay que reiniciar el JSON Server

    this.eventService.getEvento(id).subscribe(e => {
      if (e.categoria === 'log') { this.observableService.restarLog(); }
      if (e.categoria === 'warn') { this.observableService.restarWarn(); }
      if (e.categoria === 'error') { this.observableService.restarError(); }
    });

    this.eventService.deleteEvento(id).subscribe(() => { this.mostrarTodos(); });
  }
}
