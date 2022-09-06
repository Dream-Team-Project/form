import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoFormComponent } from './demo-form/demo-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersComponent } from './users/users.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'', redirectTo: '/users', pathMatch: 'full'},
  {path:'users', component: UsersComponent},
  {path:'demo-form', component: DemoFormComponent},
  {path:'add-user', component: UserFormComponent},
  {path:'edit-user/:id', component: UserFormComponent},
  {path:'**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [DemoFormComponent, UserFormComponent, UsersComponent, PageNotFoundComponent];
