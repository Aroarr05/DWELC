import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { EventM } from '../../model/event.model';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-list',
  imports:[ReactiveFormsModule, CommonModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: EventM[] = [];
  selectedClassification: 'log' | 'warn' | 'error' | 'all' = 'all';  // Agregar 'all' como opción

  // Define the form group
  filterForm: FormGroup = new FormGroup({
    classification: new FormControl(this.selectedClassification)
  });

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.loadEvents();
    this.events = this.eventService.getEvents();
  }

  onFilterChange(event: Event){
    const selectedClassification = (event.target as HTMLSelectElement).value;
    if (selectedClassification === 'all'){
      this.events = this.eventService.getEvents();
    }else{
      this.events = this.eventService.getEvents().filter(e => e.classification === selectedClassification);

      this.getEventCount(selectedClassification);
    }
  }

  // Count the number of events based on classification
  getEventCount(classification: string): number {
    return this.events.filter(event => event.classification === classification).length;
  }
}