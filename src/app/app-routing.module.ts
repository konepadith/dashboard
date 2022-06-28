import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DogEditComponent } from './modules/dogs/dog-edit/dog-edit.component';
import { DogRecoveryComponent } from './modules/dogs/dog-recovery/dog-recovery.component';
import { DogsComponent } from './modules/dogs/dogs.component';
import { FormComponent } from './modules/form/form.component';
import { GiverComponent } from './modules/giver/giver.component';
import { MailComponent } from './modules/mail/mail.component';
import { PostsComponent } from './modules/posts/posts.component';

const routes: Routes = [{
  path:'',
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
  }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
