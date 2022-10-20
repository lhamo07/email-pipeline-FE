import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { MfaComponent } from './Auth/mfa/mfa.component';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { NewPasswordComponent } from './Auth/new-password/new-password.component';
import { ToastrModule } from 'ngx-toastr';
import { IconsModule } from './icons/icons.module';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

import { DashboardComponent } from './dashboard/dashboard.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ComplaintComponent } from './complaint/complaint.component';
import { AuthInterceptor } from './auth.interceptor';
import { SendEmailComponent } from './send-email/send-email.component';
import { ForceChangePasswordComponent } from './force-change-password/force-change-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UploadFileComponent } from './upload-file/upload-file.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MfaComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    DashboardComponent,
    ComplaintComponent,
    // UploadFileComponent,
    SendEmailComponent,
    ForceChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
    }),
    IconsModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
