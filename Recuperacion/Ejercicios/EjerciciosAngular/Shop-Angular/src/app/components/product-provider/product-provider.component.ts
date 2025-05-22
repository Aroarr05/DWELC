import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/products'; 
import { ActivatedRoute } from '@angular/router';
import { ProvidesService } from '../../services/provides.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-provider',
  imports: [CommonModule,RouterModule],
  templateUrl: './product-provider.component.html'
})

export class ProductProviderComponent implements OnInit{

  products : Product[] = [];
  providerId!: number;

  constructor(private route : ActivatedRoute, private provideService : ProvidesService){}
 
  ngOnInit(): void {
   this.providerId = Number(this.route.snapshot.paramMap.get('providerId'));

   this.products = this.provideService.getProductProvider(this.providerId) || [];
  }

  
}