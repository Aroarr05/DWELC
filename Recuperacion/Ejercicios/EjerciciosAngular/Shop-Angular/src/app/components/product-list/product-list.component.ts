

/*------ Cogemos los datos del product-----
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProviderListComponent } from '../provider-list/provider-list.component';
import { ProductAlertsComponent } from '../product-alerts/product-alerts.component';

import { Product, products } from '../../model/products'; 

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ProviderListComponent, ProductAlertsComponent]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  ngOnInit() {
    // Usamos los productos definidos localmente
    this.products = products;
  }

  share() {
    window.alert('The product has been shared!');
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}*/


/*------ Cogemos solos los datos del json cambiandolo a la estrectura de products------
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProviderListComponent } from '../provider-list/provider-list.component';
import { ProductAlertsComponent } from '../product-alerts/product-alerts.component';

import { Product } from '../../model/products';
import { ProvidesService } from '../../services/provides.service';
import { ProductsTwo } from '../../model/productsTwo';
import { ProvidersM } from '../../model/provider';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports:[CommonModule,RouterModule, ProviderListComponent,ProductAlertsComponent]
  
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
}*/

// COGEMOS LOS DATOS DE JSON CON LA ESTREUCTRA DEL PRODUCT Y QUE SE MUESTREN AMBOS 

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProviderListComponent } from '../provider-list/provider-list.component';
import { ProductAlertsComponent } from '../product-alerts/product-alerts.component';

import { Product, products as localProducts } from '../../model/products';
import { ProductsTwo } from '../../model/productsTwo';
import { ProvidersM } from '../../model/provider';
import { ProvidesService } from '../../services/provides.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ProviderListComponent, ProductAlertsComponent]
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];
  providersList: ProvidersM[] = [];

  constructor(private providerService: ProvidesService) {}

  ngOnInit() {
    this.providerService.getProviders().subscribe(providers => {
      this.providersList = providers;

      // 1. Cargar productos locales
      const productosLocales: Product[] = localProducts;

      // 2. Cargar productos del JSON
      this.providerService.getProductos().subscribe((productosJson: ProductsTwo[]) => {
        const productosTransformados: Product[] = productosJson.map(p => {
          const proveedor = this.providersList.find(prov => prov.id === +p.supplier);
          return {
            id: p.product_id,
            name: p.product_name,
            price: p.cost,
            description: p.details,
            provider: proveedor ? proveedor : { id: +p.supplier, name: 'Desconocido' }
          };
        });

        // 3. Combinar ambos
        this.products = [...productosLocales, ...productosTransformados];
      });
    });
  }

  share(product: Product) {
    window.alert(`The product "${product.name}" has been shared!`);
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}

