
import { Routes } from '@angular/router';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventListComponent } from './components/event-list/event-list.component'; 

export const routes: Routes = [
    {path:'', component:EventFormComponent},
    {path:'form', component:EventFormComponent},
    {path:'list', component:EventListComponent}
    //{ path: 'edit-form', component: EventFormComponent } // Editar evento
];