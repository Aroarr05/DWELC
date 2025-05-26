//Inject :  Se usa par inyectar dependencias manualmente.Se inyecta PLATFORM_ID para saber su está corriendi en el navegadir o en el servidor.
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
// isPlatformBrowser : sive para detctar si esta corriendo en el navegador (para usar locaStorage)
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'; // Calendario bonito 
import { EmployeeService } from '../../services/employee.service';
import { EventService } from '../../services/event.service';
import { Employee } from '../../model/employee.model';
import { EventM } from '../../model/event.model';

@Component({
  selector: 'app-event-form',
  //No necesita dentro de un NgModule para usarse 
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BsDatepickerModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})

export class EventFormComponent implements OnInit {

  //Configuración del calendario
  bsConfig = {
    dateInputFormat: 'DD-MM-YYYY',
    isAnimated: true,
    containerClass: 'theme-dark-blue',
    adaptivePosition: true
  };

  empleado: Employee | null = null;
  employees: Employee[] = [];
  eventForm: FormGroup;
  //Indica si esta corriendo en este navegador
  isBrowser: boolean;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private eventService: EventService,
    //Inyecto información sobre dónde se esta ejecutando la app
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Saber si estamos en el navegador

    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      client: ['', Validators.required],
      date: ['', [Validators.required, this.dateValidator]],
      description: ['', Validators.required],
      classification: ['log', Validators.required],
      employee: [null]
    });
  }

  // Se ejecuta automñáticamnete cuando el componente se muestra por prier vez
  ngOnInit() {
    if (this.isBrowser) {
      this.loadFormFromLocalStorage();// cargo los datos en navedador

      //Se guarda automaticamente los datos en locaStorage (asi no se puerden los datos)
      this.eventForm.valueChanges.subscribe(() => {
        this.saveFormToLocalStorage();
      });
    }

    // Carga la lista de empleados desde el servicio y la guarda en this.employees
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });

    //Si ya habia un empleado seleccionado antes, lo pone en el formulario
    this.employeeService.getSelectedEmployee().subscribe(empleado => {
      if (empleado) {
        this.empleado = empleado;
        this.eventForm.patchValue({ employee: empleado.id });
      }
    });
  }

  //Guardo lo que vas escribiendo 
  private saveFormToLocalStorage() {
    if (this.isBrowser) {
      localStorage.setItem('eventFormData', JSON.stringify(this.eventForm.value));
    }
  }

  //Recuerda lo que habias escreito antes 
  private loadFormFromLocalStorage() {
    if (this.isBrowser) {
      const savedForm = localStorage.getItem('eventFormData');
      if (savedForm) {
        this.eventForm.patchValue(JSON.parse(savedForm));
      }
    }
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const selectedEmployee = this.employees.find(emp => emp.id === this.eventForm.value.employee);
      if (!selectedEmployee) {
        console.error('No hay empleado seleccionado');
        return;
      }

      const event: EventM = {
        id: new Date().getTime(),
        employee: selectedEmployee,
        title: this.eventForm.value.title,
        client: this.eventForm.value.client,
        date: this.eventForm.value.date,
        description: this.eventForm.value.description,
        classification: this.eventForm.value.classification,
        creationDate: new Date()
      };

      this.eventService.addEvent(event); // Guardo el evento
      if (this.isBrowser) {
        localStorage.removeItem('eventFormData'); // Limpio el guadado temporal
      }
      this.eventForm.reset(); // limpia el formulario
    }
  }

  dateValidator(control: any) {
    // Revisa si la fecha esta vacia
    if (!control.value) {
      return { required: true };
    }

    const selectedDate = new Date(control.value); // Convierto la fecha en formato Date
    const today = new Date(); // Creo hace un mes desde hoy 
    const lastMonth = new Date(); // Y hoy
    // Solo se permite fechas entre hace un mes y hoy.Si esta fuera de ese rango, la fecha no es valida
    lastMonth.setMonth(today.getMonth() - 1);

    return selectedDate >= lastMonth && selectedDate <= today ? null : { invalidDate: true };
  }
}
