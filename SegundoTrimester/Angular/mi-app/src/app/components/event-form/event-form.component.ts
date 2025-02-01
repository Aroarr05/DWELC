import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { LoggerService } from '../../services/logger.service';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {

  employees: Employee[] =[
    new Employee(1,'John Doe'),
    new Employee(2,'Jane Shith'),
  ] ;


}
