import { Injectable } from '@angular/core';
import { Client } from '../model/client.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  private clientsUrl= 'asstes/client.json';

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]>{
    return this.http.get<Client[]>(this.clientsUrl);
  }
}
