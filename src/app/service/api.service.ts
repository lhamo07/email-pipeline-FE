import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  public smtpBounceNotification() {
    let url =
      'https://eankhwjso9.execute-api.ap-southeast-1.amazonaws.com/dev/bounced';
    return this.http.get<IDelivered>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    });
  }
  public SMTPComplaintNotifications() {
    let url =
      'https://eankhwjso9.execute-api.ap-southeast-1.amazonaws.com/dev/complaint';
    return this.http.get<IDelivered>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    });
  }
  public SMTPDeliveryNotifications() {
    let url =
      'https://eankhwjso9.execute-api.ap-southeast-1.amazonaws.com/dev/delivered';
    return this.http.get<IDelivered>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    });
  }
  public SMTPClickNotifications() {
    let url =
      'https://eankhwjso9.execute-api.ap-southeast-1.amazonaws.com/dev/click';
    return this.http.get<IClick>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    });
  }
  public SMTPOpenNotifications() {
    let url =
      'https://eankhwjso9.execute-api.ap-southeast-1.amazonaws.com/dev/open';
    return this.http.get<IOpen>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    });
  }
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
