import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Amplify, Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: any;
  name: string;
  otp: any;
  newpassword: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticationSubject: BehaviorSubject<any>;

  constructor() {
    Amplify.configure({
      Auth: environment.cognito,
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    //console.log("hello");
    return Auth.signUp({
      username: user.email,
      password: user.password,
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    console.log(Auth.confirmSignUp);
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password).then(() => {
      this.authenticationSubject.next(true);
    });
  }
  public forgotPassword(user: IUser): Promise<any> {
    return Auth.forgotPassword(user.email).then(() => {
      this.authenticationSubject.next(true);
    });
  }

  public confirmForgotPassword(user: IUser): Promise<any> {
    return Auth.forgotPasswordSubmit(user.email, user.otp, user.newpassword)
      .then(() => {
        this.authenticationSubject.next(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  public signOut(): Promise<any> {
    return Auth.signOut().then(() => {
      this.authenticationSubject.next(false);
    });
  }

  loggedInCheck() {
    return !!localStorage.getItem(
      // 'CognitoIdentityServiceProvider.2situb5qd72946epu259r37fuk.LastAuthUser'
      'CognitoIdentityServiceProvider.3b03ji1vjudf0fqlm48gjkn9t3.LastAuthUser'
    );
  }
}
