import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
})
export class SendEmailComponent implements OnInit {
  sendEmailForm!: FormGroup;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.sendEmailForm = new FormGroup({
      subject: new FormControl(null, [Validators.required]),
      to: new FormControl(null, [Validators.required]),
      message: new FormControl(null),
    });
  }

  onEmailSend() {
    let param = {
      subject: this.sendEmailForm.get('subject')?.value,
      to: [this.sendEmailForm.get('to')?.value],
      message: this.sendEmailForm.get('message')?.value,
    };
    // console.log(param);
    this.apiService.SentEmail(param).subscribe(
      (res) => {
        console.log('res', res);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
