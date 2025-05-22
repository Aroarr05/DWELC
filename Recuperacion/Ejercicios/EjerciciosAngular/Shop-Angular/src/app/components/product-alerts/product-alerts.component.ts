import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../model/products';
@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrl: './product-alerts.component.css',
  standalone: false
})

export class ProductAlertsComponent {
  // @Input() es un decorador que permite que esta propiedad 'product' pueda ser pasada desde el componente padre
  @Input() product: Product | undefined;

  // @Output() es un decorador que crea un "evento" personalizado. En este caso, 'notify' es un EventEmitter
  @Output() notify = new EventEmitter();
}
