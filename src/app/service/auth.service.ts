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
  oldpassword: any;
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
    return Auth.signIn(user.email, user.password).then(user => {
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          Auth.completeNewPassword(
              user,               // the Cognito User Object
              user.newPassword,       // the new password
              // OPTIONAL, the required attributes
          ).then(user => {
              // at this time the user is logged in if no MFA required
              console.log(user);
          }).catch(e => {
            console.log(e);
          });
      } else {
          // other situations
      }
  }).catch(e => {
      console.log(e);
  })}


  public forgotPassword(user: IUser): Promise<any> {
    return Auth.forgotPassword(user.email).then(() => {
      this.authenticationSubject.next(true);
    });
  }

  // public changePassword(user: IUser): Promise<any> {
  //   return Auth.changePassword(user.newpassword,user.oldpassword).then(() => {
  //     this.authenticationSubject.next(true);
  //   });
  // }

  public confirmForgotPassword(user: IUser): Promise<any> {
    return Auth.forgotPasswordSubmit(
      user.email,
      user.otp,
      user.newpassword
    ).then(() => {
      this.authenticationSubject.next(true);
    });
  }
  public signOut(): Promise<any> {
    return Auth.signOut().then(() => {
      this.authenticationSubject.next(false);
    });
  }

  // loggedInCheck() {
  //   return !!localStorage.getItem(
  //     // 'CognitoIdentityServiceProvider.2situb5qd72946epu259r37fuk.LastAuthUser'
  //     'CognitoIdentityServiceProvider.3b03ji1vjudf0fqlm48gjkn9t3.LastAuthUser'
  //   );
  // }
  loggedInCheck() {
    return localStorage.getItem(
      `CognitoIdentityServiceProvider.3b03ji1vjudf0fqlm48gjkn9t3.${localStorage.getItem(
        'CognitoIdentityServiceProvider.3b03ji1vjudf0fqlm48gjkn9t3.LastAuthUser'
      )}.idToken`
    );
  }
}
