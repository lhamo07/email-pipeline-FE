import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, IUser } from 'src/app/service/auth.service';
import { ToastNotificationService } from 'src/app/service/toast-notification.service';
import { CustomValidators } from 'src/app/helper/custom.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  isConfirm: boolean = false;
  loading: boolean = false;
  showPassword: boolean = false;
  user: IUser;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notify: ToastNotificationService
  ) {
    this.user = {} as IUser;
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          // check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, {
            hasNumber: true,
          }),
          // check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, {
            hasCapitalCase: true,
          }),
          // check whether the entered password has a lower case letter
          CustomValidators.patternValidator(/[a-z]/, {
            hasSmallCase: true,
          }),
          // check whether the entered password has a special character
          CustomValidators.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true,
            }
          ),
          Validators.minLength(8),
        ])
      ),
      code: new FormControl(null),
    });
  }

  onSubmit() {
    console.log('sign up works');
    this.user.email = this.registerForm.get('email')?.value;
    this.user.password = this.registerForm.get('password')?.value;

    this.authService
      .signUp(this.user)
      .then(() => {
        this.isConfirm = true;
        this.notify.showSuccess('Register successfully');
        // this.router.navigate(['/code']);
      })
      .catch((error) => {
        this.notify.showError(error.message);
      });
    // console.log('user', this.user.email);
  }

  changeKeyType() {
    this.showPassword = !this.showPassword;
  }

  public confirmSignUp() {
    this.user.email = this.registerForm.get('email')?.value;
    console.log(this.registerForm.get('email')?.value);
    this.user.code = this.registerForm.get('code')?.value;
    console.log(this.registerForm.get('code')?.value);
    this.authService
      .confirmSignUp(this.user)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(() => {
        this.loading = false;
      });
  }

  errorCatcher(type: string, control: string): boolean {
    return (
      this.registerForm.controls[control].hasError('required') ||
      this.registerForm.controls[control].hasError(type)
    );
  }
}
