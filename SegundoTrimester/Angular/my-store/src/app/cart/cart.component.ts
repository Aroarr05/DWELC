import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule, NgIf} from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone:true,
  imports: [CommonModule, NgIf, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  items: any[] = [];
  constructor(private cartService: CartService) { }
  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }
}
