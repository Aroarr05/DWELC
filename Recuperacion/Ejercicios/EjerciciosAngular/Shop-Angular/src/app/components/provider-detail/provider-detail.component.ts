import { Component, OnInit} from '@angular/core';
import { ProvidersM } from '../../model/provider'; 
import { ActivatedRoute } from '@angular/router';
import { ProvidesService } from '../../services/provides.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-provider-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './provider-detail.component.html'
})

export class ProviderDetailComponent implements OnInit {

  provider?: ProvidersM;

  constructor(private route: ActivatedRoute, private providerService : ProvidesService){}
  
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    
    const providerIdFromRoute = Number(routeParams.get('providerId'));
 
    this.providerService.getProviders().subscribe( data => {
      this.provider = data.find(p => Number(p.id) === providerIdFromRoute); 
      console.log(this.provider);
    })
  }
}