import { NgModule } from '@angular/core';
import { ManageUserComponent } from './manage-user.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageUserRoutingModule } from './manage-user-routing.module';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    ManageUserComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManageUserRoutingModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    HttpClientModule,
    ToastModule
  ],
  exports: [
    ManageUserComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent
  ],
  providers: [MessageService]
})
export class ManageUserModule { }
