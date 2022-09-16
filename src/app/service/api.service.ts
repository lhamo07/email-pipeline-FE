import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  public smtpBounceNotification() {
    let url =
      'https://u1yzqxmqw4.execute-api.us-east-1.amazonaws.com/test/bounced';
    return this.http.get<IDelivered>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    });
  }
  public SMTPComplaintNotifications() {
    let url =
      'https://u1yzqxmqw4.execute-api.us-east-1.amazonaws.com/test/complaint';
    return this.http.get<IDelivered>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    });
  }
  public SMTPDeliveryNotifications() {
    let url =
      'https://u1yzqxmqw4.execute-api.us-east-1.amazonaws.com/test/delivered';
    return this.http.get<IDelivered>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    });
  }
}
interface IDelivered {
  delivered: any;
}
