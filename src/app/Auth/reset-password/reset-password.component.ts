import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, IUser } from 'src/app/service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  user: IUser;
  forgotPassForm!: FormGroup;
  isConfirm: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.user = {} as IUser;
  }

  ngOnInit(): void {
    this.forgotPassForm = new FormGroup({
      email: new FormControl(null),
      otp: new FormControl(null),
      newpassword: new FormControl(null),
    });
  }
  onForgotPassword() {
    this.user.email = this.forgotPassForm.get('email')?.value;

    this.authService
      .forgotPassword(this.user)
      .then(() => {
        this.isConfirm = true;

        console.log('forgot pass');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  public confirmPasscode() {
    this.user.email = this.forgotPassForm.get('email')?.value;
    console.log(this.forgotPassForm.get('email')?.value);
    this.user.otp = this.forgotPassForm.get('otp')?.value;
    console.log(this.forgotPassForm.get('otp')?.value);
    this.user.newpassword = this.forgotPassForm.get('newpassword')?.value;
    this.user.password = this.forgotPassForm.get('password')?.value;

    this.authService
      .confirmForgotPassword(this.user)
      .then(() => {
        // console.log(this.user.newpassword);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
