import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, IUser } from '../service/auth.service';

@Component({
  selector: 'app-force-change-password',
  templateUrl: './force-change-password.component.html',
  styleUrls: ['./force-change-password.component.scss']
})
export class ForceChangePasswordComponent implements OnInit {
  @Output() firstTimePassword: EventEmitter<string>= new EventEmitter();
  forceChangePassword!: FormGroup;
  loading!: boolean;
  user: IUser;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private router: Router,) {   this.user = {} as IUser;}

  ngOnInit(): void {
    this. forceChangePassword = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  submitForceChangePassword(){
    this.firstTimePassword.emit(this.forceChangePassword.get('password')?.value);
  }
  
 

}
