import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product, products } from '../../model/products'; 
import { CartService } from '../../services/cart.service'; 


@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.css',
    standalone: false
})
export class ProductDetailsComponent implements OnInit {
  
  //Almacenamos los detalles del producto seleccionado
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit() {
    //obtenemos los parametros de la ruta actual usando ActivatedRoute
    const routeParams = this.route.snapshot.paramMap;
    // extraemos el prametro productId de la url y lo convertimos a un número
    const productIdFromRoute = Number(routeParams.get('productId'));

    // Buscamos el producto cuya propiedad 'id' coincida con el 'productId' obtenido de la ruta
    // Si el producto existe, se asigna a la propiedad 'product'
    this.product = products.find(product => product.id === productIdFromRoute);
  }

  //funcion para agregar el producto al carrito
  addToCart(product: Product) {
    //llamamos al servicio de carrito para agregar el producto seleccionado
    this.cartService.addToCart(product);
  
    window.alert('Your product has been added to the cart!');
  }
}
