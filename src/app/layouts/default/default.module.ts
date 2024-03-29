import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from 'src/app/modules/dashboard.service';
import { MailComponent } from 'src/app/modules/mail/mail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import {NgxPaginationModule} from 'ngx-pagination';
import { DogsComponent } from 'src/app/modules/dogs/dogs.component';
import { SlideDirective } from 'src/app/modules/dogs/dog-edit/slide.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DogEditComponent } from 'src/app/modules/dogs/dog-edit/dog-edit.component';
import { DogRecoveryComponent } from 'src/app/modules/dogs/dog-recovery/dog-recovery.component';
import { FormComponent } from 'src/app/modules/form/form.component';
import { MatSortModule } from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import { GiverComponent } from 'src/app//modules/giver/giver.component';
import { LogInComponent } from 'src/app/modules/log-in/log-in.component';
import { DonateCashComponent } from 'src/app/modules/donate-cash/donate-cash.component';
import { ReportComponent } from 'src/app/modules/report/report.component';
import { ReportDogComponent } from 'src/app/modules/report/report-dog/report-dog.component';
import { ReportDonateComponent } from 'src/app/modules/report/report-donate/report-donate.component';
import { ReportGiverComponent } from 'src/app/modules/report/report-giver/report-giver.component';
import { ReportUserComponent } from 'src/app/modules/report/report-user/report-user.component';
import { ReportFormComponent } from 'src/app/modules/report/report-form/report-form.component';

import { AdminComponent } from 'src/app/modules/admin/admin.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    MailComponent,
    DogsComponent,
    SlideDirective,
    DogEditComponent,
    FormComponent,
    GiverComponent,
    DogRecoveryComponent,
    LogInComponent,
    DonateCashComponent,
    ReportComponent,
    ReportDogComponent,
    ReportUserComponent,
    ReportDonateComponent,
    ReportGiverComponent,
    ReportFormComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSortModule,
    MatTabsModule,
  ],
  providers:[
    DashboardService
  ]
})
export class DefaultModule { }
