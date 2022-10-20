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
        this.notify.showSuccess(res.message);

        // this.router.navigate(['/dashboard']);
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
}
