import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  public smtpBounceNotification() {
    let url =
      'https://vm35citgg6.execute-api.ap-southeast-1.amazonaws.com/test/bounced';
    return this.http.post<IDelivered>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    });
  }
  public SMTPComplaintNotifications() {
    let url =
      'https://vm35citgg6.execute-api.ap-southeast-1.amazonaws.com/test/complaint';
    return this.http.post<IDelivered>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    });
  }
  public SMTPDeliveryNotifications() {
    let url =
      'https://vm35citgg6.execute-api.ap-southeast-1.amazonaws.com/test/delivered';
    // 'https://m3p7m3x86h.execute-api.ap-southeast-1.amazonaws.com/test/delivered';
    //'https://m3p7m3x86h.execute-api.ap-southeast-1.amazonaws.com/test/delivered'

    return this.http.post<IDelivered>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    });
  }
  public SMTPClickNotifications() {
    let url =
      'https://vm35citgg6.execute-api.ap-southeast-1.amazonaws.com/test/click';
    return this.http.post<IClick>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    });
  }
  public SMTPOpenNotifications() {
    let url =
      'https://vm35citgg6.execute-api.ap-southeast-1.amazonaws.com/test/open';
    return this.http.post<IOpen>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    });
  }
  employees!: any[];
}

interface IDelivered {
  delivered: any;
}
interface IClick {
  click: any;
}
interface IOpen {
  open: any;
}
