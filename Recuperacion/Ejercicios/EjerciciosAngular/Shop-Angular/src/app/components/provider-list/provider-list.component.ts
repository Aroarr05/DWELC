import { Component, OnInit } from '@angular/core';
import { ProvidesService } from '../../services/provides.service'; 
import { ProvidersM } from '../../model/provider'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-provider-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './provider-list.component.html',
  styleUrl: './provider-list.component.css'
})

export class ProviderListComponent implements OnInit {

  items : ProvidersM[] = [];

  constructor(private providerService : ProvidesService){}
  

  ngOnInit(): void {
   this.providerService.getProviders().subscribe( data => {
      this.items = data;
      console.log(data)
   });
  }
}