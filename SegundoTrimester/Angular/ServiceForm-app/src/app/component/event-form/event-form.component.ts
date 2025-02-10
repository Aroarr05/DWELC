import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoggerService } from '../../services/logger.service';
import { EmployeeService } from '../../services/employee.service';
import { ClientService } from '../../services/client.service';
import { Employee } from '../../model/employee.model';
import { Client } from '../../model/client.model';
import { Event } from '../../model/event.model';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;
  employees: Employee[] = [];
  clients: Client[] = [];
  selectedEmployee: Employee | null = null;

  constructor(
    private fb: FormBuilder,
    private loggerService: LoggerService,
    private employeeService: EmployeeService,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    // Cargar empleados y clientes desde los archivos JSON
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;

      // Obtener el empleado seleccionado desde localStorage
      const storedEmployee = localStorage.getItem('selectedEmployee');
      if (storedEmployee) {
        this.selectedEmployee = JSON.parse(storedEmployee);
      } else {
        this.selectedEmployee = this.employees[0]; // Seleccionar el primero por defecto
        this.saveEmployeeToLocalStorage();
      }
    });

    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
    });

    // Inicializar formulario
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      classification: ['', [Validators.required]],
      client: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
  }

  // Método para guardar el empleado seleccionado en localStorage
  saveEmployeeToLocalStorage(): void {
    if (this.selectedEmployee) {
      localStorage.setItem('selectedEmployee', JSON.stringify(this.selectedEmployee));
    }
  }

  // Método para cambiar el empleado seleccionado
  onEmployeeChange(employeeId: number): void {
    this.selectedEmployee = this.employees.find(emp => emp.id === employeeId) || null;
    this.saveEmployeeToLocalStorage();
  }

  // Enviar el formulario
  onSubmit(): void {
    if (this.eventForm.invalid) {
      return;
    }

    const event: Event = {
      id: Date.now(),
      employee: this.selectedEmployee!, // Asegúrate de que siempre hay un empleado seleccionado
      client: this.clients.find(client => client.id === this.eventForm.value.client)!, // Se guarda el objeto Client completo
      date: new Date(this.eventForm.value.date),
      title: this.eventForm.value.title,
      description: this.eventForm.value.description,
      classification: this.eventForm.value.classification,
      createdDate: new Date()
    };

    this.loggerService.addEvent(event);
    this.eventForm.reset();
  }
}
