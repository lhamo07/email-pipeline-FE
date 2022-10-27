import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import {
  NgbModalConfig,
  NgbModal,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastNotificationService } from '../service/toast-notification.service';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class SendEmailComponent implements OnInit {
  text1: string = '';
  to: any[] = [];
  text3: string = '';

  arrayBuffer: any;
  file: any;
  JSONObject = {
    object: {},
    string: '',
  };
  sendEmailForm!: FormGroup;
  toggleModal1: any = true;
  toggleModal2: any = true;
  constructor(
    private apiService: ApiService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private router: Router,
    private notify: ToastNotificationService
  ) {}

  ngOnInit(): void {
    this.sendEmailForm = new FormGroup({
      subject: new FormControl(null, [Validators.required]),
      to: new FormControl(null, [Validators.required, Validators.email]),
      message: new FormControl(null),
    });
  }

  onEmailSend() {
    let toEmail = this.sendEmailForm.get('to')?.value;
    let formattedEmails: any = [];
    if (toEmail.length > 0) {
      toEmail.forEach((eachEmail: any) => {
        formattedEmails.push(eachEmail.value);
      });
    }
    console.log(formattedEmails);
    let param = {
      subject: this.sendEmailForm.get('subject')?.value,
      to: formattedEmails,
      message: this.sendEmailForm.get('message')?.value,
    };
    // console.log(param);
    this.apiService.SentEmail(param).subscribe(
      (res) => {
        console.log('res', res);
        this.notify.showSuccess(res.message);
        this.text1 = ''; //and reset the property afterwards.
        // this.text2 = '';
        this.text3 = '';

        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
  incomingfile(event: any) {
    this.file = event.target.files[0];
  }
  upload() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      // const first_sheet_name = workbook.SheetNames[0];
      const first_sheet_name = 'Sheet1';
      const worksheet = workbook.Sheets[first_sheet_name];
      const JSON_Object = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      this.JSONObject.object = JSON_Object; //Data in JSON Format
      this.JSONObject.string = JSON.stringify(JSON_Object); //Data in String Format

      console.log('JSON object:', this.JSONObject.object);
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  handleSendEmail() {
    this.toggleModal1 = true;
    this.toggleModal2 = true;
  }
  handleUploadFile() {
    this.toggleModal1 = false;
    this.toggleModal2 = false;
    // this.modalService.open(UploadFileComponent);
  }
  public errorMessages = {
    pattern: 'Email must be in format abc@abc.com',
  };
  public validators = [this.checkEmailValidator];
  private checkEmailValidator(control: FormControl) {
    const patternRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!patternRegex.test(control.value)) {
      return { pattern: true };
    } else {
      return null;
    }
  }
}
