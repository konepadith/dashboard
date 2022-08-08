import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { DefaultComponent } from './layouts/default/default.component';
import { AdminComponent } from './modules/admin/admin.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DogEditComponent } from './modules/dogs/dog-edit/dog-edit.component';
import { DogRecoveryComponent } from './modules/dogs/dog-recovery/dog-recovery.component';
import { DogsComponent } from './modules/dogs/dogs.component';
import { DonateCashComponent } from './modules/donate-cash/donate-cash.component';
import { FormComponent } from './modules/form/form.component';
import { GiverComponent } from './modules/giver/giver.component';
import { LogInComponent } from './modules/log-in/log-in.component';
import { MailComponent } from './modules/mail/mail.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { PostsComponent } from './modules/posts/posts.component';
import { ReportComponent } from './modules/report/report.component';

const routes: Routes = [{
  path:'',
  canActivate:[AuthGuard],
  component:DefaultComponent,
  children:[{
    path:'',
    component:DashboardComponent
  },{
    path:'posts',
    component:PostsComponent
  },
  {
    path:'mail',
    component:MailComponent
  },
  {
    path:'dogs',
    component:DogsComponent
  },
  {
    path:'dogs/dog-edit/:id',
    component:DogEditComponent
  },
  {
    path:'form',
    component:FormComponent
  },
  {
    path:'giver',
    component:GiverComponent
  },
  {
    path:'dog_recovery',
    component:DogRecoveryComponent
  },
  {
    path:'donatecash',
    component:DonateCashComponent
  },
  {
    path:'report',
    component:ReportComponent
  },{
    path:'admin',
    component:AdminComponent
  }
  ]},
  {path:'login',
  component:LogInComponent},
  {path:'**',
  component:NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
