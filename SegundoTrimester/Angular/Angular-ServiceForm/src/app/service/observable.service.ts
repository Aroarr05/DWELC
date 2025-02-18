import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Evento } from '../model/Evento';

import { EventService } from './event.service';
import { Empleado } from '../model/Empleado';
import { EmpleadoService } from './empleado.service';

@Injectable({
  providedIn: 'root'
})

export class ObservableService {
  
  private eventService: EventService = inject(EventService);
  private empleadoService: EmpleadoService = inject(EmpleadoService);
  
  listaEventos: Evento[] = [];
  listaEmpleados: Empleado[] = [];
  
  private username = new BehaviorSubject<string>("");
  username$ = this.username.asObservable();
  
  contadorLog = 0;
  contadorWarn = 0;
  contadorError = 0;
  contadorEmpl = 0;

  private countLog = new BehaviorSubject<number>(this.contadorLog);
  countLog$ = this.countLog.asObservable();
  
  private countWarn = new BehaviorSubject<number>(this.contadorWarn);
  countWarn$ = this.countWarn.asObservable();
  
  private countError = new BehaviorSubject<number>(this.contadorError);
  countError$ = this.countError.asObservable();
  
  private countEmpl = new BehaviorSubject<number>(this.contadorEmpl);
  countEmpl$ = this.countEmpl.asObservable();
  
  constructor() {
    this.eventService.getAllEventos().subscribe((listaEventos: Evento[]) => { this.listaEventos = listaEventos; });
    this.empleadoService.getAllEmpleados().subscribe((listaEmpleados: Empleado[]) => { this.listaEmpleados = listaEmpleados; });

    this.contadorLog = this.listaEventos.filter((e) => e.categoria === "log").length;
    this.contadorWarn = this.listaEventos.filter((e) => e.categoria === "warn").length;
    this.contadorError = this.listaEventos.filter((e) => e.categoria === "error").length;
    this.contadorEmpl = this.listaEmpleados.length;

    this.countLog.next(this.contadorLog);
    this.countWarn.next(this.contadorWarn);
    this.countError.next(this.contadorError);
    this.countEmpl.next(this.contadorEmpl);
  }

  sumarLog() { this.countLog.next(this.countLog.value + 1); }
  restarLog() { this.countLog.next(this.countLog.value - 1); }
  
  sumarWarn() { this.countWarn.next(this.countWarn.value + 1); }
  restarWarn() { this.countWarn.next(this.countWarn.value - 1); }
  
  sumarError() { this.countError.next(this.countError.value + 1); }
  restarError() { this.countError.next(this.countError.value - 1); }
  
  sumarEmpleado() { this.countEmpl.next(this.countEmpl.value + 1); }
  
  actualizarUsername(value: any) { this.username.next(value); }
}