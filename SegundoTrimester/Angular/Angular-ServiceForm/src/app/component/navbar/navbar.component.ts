import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { Evento } from '../../model/Evento';

import { ObservableService } from '../../service/observable.service';
import { EventService } from '../../service/event.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  private observableService: ObservableService = inject(ObservableService);
  private eventService: EventService = inject(EventService);
  
  username: string = "";

  listaEventos: Evento[] = [];

  logs = 0;
  warns = 0;
  errors = 0;
  empleados = 0;

  constructor () {}

  ngOnInit() {
    this.eventService.getAllEventos().subscribe((listaEventos: Evento[]) => { this.listaEventos = listaEventos; });
    
    this.observableService.username$.subscribe(value => {
      this.username = value;
    });

    if(typeof localStorage !== "undefined") {
      this.username = localStorage.getItem("username") ?? "";
    }

    this.observableService.countLog$.subscribe(count => {
      this.logs = count;
    });
    
    this.observableService.countWarn$.subscribe(count => {
      this.warns = count;
    });
    
    this.observableService.countError$.subscribe(count => {
      this.errors = count;
    });
    
    this.observableService.countEmpl$.subscribe(count => {
      this.empleados = count;
    });
  }
}
