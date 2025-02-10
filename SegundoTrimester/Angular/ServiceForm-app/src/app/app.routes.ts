import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { EventFormComponent } from './component/event-form/event-form.component';
import { EventListComponent } from './component/event-list/event-list.component';

export const routes: Routes = [
  { path: '', component: EventFormComponent },  // Página principal con el formulario
  { path: 'events', component: EventListComponent }  // Página de lista de eventos
];

export const appRouter = provideRouter(routes);
