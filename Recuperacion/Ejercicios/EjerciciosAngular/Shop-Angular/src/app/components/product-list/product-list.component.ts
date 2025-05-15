import { Component } from '@angular/core';

import { Product, products } from '../../model/products';
import { ProvidesService } from '../../services/provides.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: false
})

export class ProductListComponent {
  products: Product[] = [...products];

  constructor(private providerService: ProvidesService) {
    this.providerService.getProductos().subscribe(listaProductos => {
      const productosMapeados: Product[] = listaProductos.map(
        p => ({
          id: p.product_id,
          name: p.product_name,
          price: p.cost,
          description: p.details,
          provider: { id: p.supplier, name: " " }
        })
      );
      this.products = [...productosMapeados, ...products]
    });
  }

  share() {
    window.alert('The product has been shared!');
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}


