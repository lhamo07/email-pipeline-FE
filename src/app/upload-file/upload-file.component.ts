import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import { SendEmailComponent } from '../send-email/send-email.component';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  arrayBuffer: any;
  file: any;
  JSONObject = {
    object: {},
    string: '',
  };
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}
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
  sendEMail() {
    this.modalService.open(SendEmailComponent);
  }
}
