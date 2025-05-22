import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../model/products';
import { ProvidesService } from '../../services/provides.service';
import { ProductsTwo } from '../../model/productsTwo';
import { ProvidersM } from '../../model/provider';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];
  providersList: ProvidersM[] = [];

  constructor(private providerService: ProvidesService) {}

  ngOnInit() {
    // Primero carga proveedores desde el JSON
    this.providerService.getProviders().subscribe(providers => {
      this.providersList = providers;

      // Luego carga productos y los mapea con los proveedores
      this.providerService.getProductos().subscribe((listaProductosTwo: ProductsTwo[]) => {
        this.products = listaProductosTwo.map(p => {
          const provider = this.providersList.find(prov => prov.id === parseInt(p.supplier));
          return {
            id: p.product_id,
            name: p.product_name,
            price: p.cost,
            description: p.details,
            provider: provider ? provider : { id: +p.supplier, name: 'Desconocido' }
          };
        });
      });
    });
  }

  share() {
    window.alert('The product has been shared!');
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}
