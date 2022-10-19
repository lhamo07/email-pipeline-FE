import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, IUser } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ToastNotificationService } from 'src/app/service/toast-notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup;
  loading!: boolean;
  user: IUser;
  forceChangePassword: any = false;
  forceChangeChallangeName = '';
  forceChangeclientId = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private notify: ToastNotificationService
  ) {
    this.user = {} as IUser;
  }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  onSignin() {
    this.user.email = this.signInForm.get('email')?.value;
    this.user.password = this.signInForm.get('password')?.value;
    this.loading = true;
   

    this.authService
      .signIn(this.user)
      .then(() => {
        this.notify.showSuccess('Login successful');
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        this.notify.showError(error.message);
        this.loading = false;
      });
  }
}
