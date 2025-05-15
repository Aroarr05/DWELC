import { Injectable } from '@angular/core';
import { ProvidersM } from '../model/provider';
import { HttpClient } from '@angular/common/http';
import { Product, products } from '../model/products';
import { ProductosDos } from '../model/productosDos';


@Injectable({
  providedIn: 'root'
})

export class ProvidesService {

  providers: ProvidersM[]=[];

  private url = "http://localhost:3001/providers";
  private urlProductosDos = "http://localhost:3002/productosDos";

  constructor(private http: HttpClient) { }
  
  getProviders(){
    return this.http.get<ProvidersM[]>(this.url);
  }

  getProductos(){
    return this.http.get<ProductosDos[]>(this.urlProductosDos);
  }
  
  getProductProvider(providerId: number): Product[] | undefined{
    return products.filter(p=> p.provider.id === providerId);
  }

}
