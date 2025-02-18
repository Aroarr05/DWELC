import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { EmpleadoService } from '../../service/empleado.service';
import { Empleado } from '../../model/Empleado';
import { ObservableService } from '../../service/observable.service';

@Component({
  selector: 'app-empleados',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empleados.component.html'
})
export class EmpleadosComponent {

  private empleadoService: EmpleadoService = inject(EmpleadoService);
  private observableService: ObservableService = inject(ObservableService);
  private listaEmpleados: Empleado[] = [];

  constructor() {
    this.empleadoService.getAllEmpleados().subscribe((empleados: Empleado[]) => { this.listaEmpleados = empleados; });
  }

  emplForm = new FormGroup({
    "nombre": new FormControl("", [Validators.required, Validators.minLength(3)]),
  });

  submit() {
    if (this.emplForm.valid) {
      const nuevoEmpleado: Empleado = {
        id: (Number.parseInt(this.listaEmpleados[this.listaEmpleados.length - 1].id) + 1).toString(),
        nombre: this.emplForm.value.nombre!
      }

      this.observableService.sumarEmpleado();

      this.empleadoService.addEmpleado(nuevoEmpleado).subscribe((empleado: Empleado) => {
        this.listaEmpleados.push(empleado);
      })
      this.emplForm.reset();
    }
  }
}
