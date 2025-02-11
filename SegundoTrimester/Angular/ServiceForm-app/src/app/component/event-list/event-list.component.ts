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
  selectedClassification: 'log' | 'warn' | 'error' = 'log';

  // Define the form group
  filterForm: FormGroup = new FormGroup({
    classification: new FormControl(this.selectedClassification)
  });

  constructor(private eventService: EventService) { }

  ngOnInit() {
    // Initialize the reactive form
    this.filterForm = new FormGroup({
      classification: new FormControl(this.selectedClassification)
    });

    // Subscribe to form changes
    this.filterForm.get('classification')?.valueChanges.subscribe(value => {
      this.onClassificationChange(value);
    });

    // Load events initially
    this.getEvents();
  }

  getEvents() {
    this.events = this.eventService.filterEvents(this.selectedClassification);
  }

  onClassificationChange(classification: 'log' | 'warn' | 'error') {
    this.selectedClassification = classification;
    this.getEvents();
  }

  // Count the number of events based on classification
  getEventCount(classification: 'log' | 'warn' | 'error'): number {
    return this.events.filter(event => event.classification === classification).length;
  }
}