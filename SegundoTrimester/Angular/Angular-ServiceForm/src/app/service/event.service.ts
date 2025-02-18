import {Injectable} from '@angular/core';

import { Evento } from '../model/Evento';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  
  private url = 'http://localhost:3000/eventos';

  constructor(private http: HttpClient) { }

  getAllEventos() { return this.http.get<Evento[]>(this.url); }

  getLogs() { return this.http.get<Evento[]>(`${this.url}?categoria=log`); }

  getWarns() { return this.http.get<Evento[]>(`${this.url}?categoria=warn`); }
  
  getErrors() { return this.http.get<Evento[]>(`${this.url}?categoria=error`); }

  getEvento(id: string) { return this.http.get<Evento>(`${this.url}/${id}`); }

  addEvento(evento: Evento) { return this.http.post<Evento>(this.url, evento); }

  updateEvento(evento: Evento) { return this.http.put<Evento>(`${this.url}/${evento.id}`, evento); }

  deleteEvento(id: string) { return this.http.delete(`${this.url}/${id}`); }
}