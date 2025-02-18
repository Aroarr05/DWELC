import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

import { Empleado } from '../../model/Empleado';
import { EmpleadoService } from '../../service/empleado.service';
import { ObservableService } from '../../service/observable.service';

@Component({
  selector: 'app-users',
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  empleadoService: EmpleadoService = inject(EmpleadoService);
  listEmpleados: Empleado[] = [];
  username: string = "";

  constructor(private observableService: ObservableService) {
    this.empleadoService.getAllEmpleados().subscribe((listEmpleados: Empleado[]) => { this.listEmpleados = listEmpleados; });
  }
  
  userForm = new FormGroup({
    "username": new FormControl("", Validators.required),
  });

  submit() {
    this.username = this.userForm.get("username")?.value as string;
    localStorage.setItem("username", this.username);
    this.observableService.actualizarUsername(localStorage.getItem("username"));
  }
}