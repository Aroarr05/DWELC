/*import { Component } from '@angular/core';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css'],
    standalone: false
})
export class TopBarComponent {

}*/

import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  standalone: false
})

export class TopBarComponent {

  numberOfItems$: Observable<number>;

  constructor(private cartService: CartService) {
    this.numberOfItems$ = this.cartService.itemsObservable.pipe(
      map(items => items.length)
    );
  }

}

