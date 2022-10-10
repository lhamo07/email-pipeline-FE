import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  public smtpBounceNotification() {
    let url =
      'https://ytvoakqcha.execute-api.ap-southeast-1.amazonaws.com/dev/bounced';
    // const token =
    //   'eyJraWQiOiJaUXcyYnk2WFwvU2orNjdBSkVaZnB0dHJkamU1dVp4MGZReWtRbjQ3RERYUT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhYjM4ZDMxNC1iNGQyLTQ3MGEtOGVjNi02OTQ2Y2I1Y2M5MjgiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX1c3WFZXc2lHMSIsImNvZ25pdG86dXNlcm5hbWUiOiJhYjM4ZDMxNC1iNGQyLTQ3MGEtOGVjNi02OTQ2Y2I1Y2M5MjgiLCJvcmlnaW5fanRpIjoiZTFiMjNhNzMtNzlhMS00NGNhLThlNDctZDA5ZWYyMDUyYjgyIiwiYXVkIjoiM2IwM2ppMXZqdWRmMGZxbG00OGdqa245dDMiLCJldmVudF9pZCI6IjBjY2RjMzI3LTY1NmUtNDg0OC1hNjEyLWQyYmExNjQxZTVmNCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjY1MzgzMzcxLCJleHAiOjE2NjUzODY5NzEsImlhdCI6MTY2NTM4MzM3MSwianRpIjoiNWI2ZjQ4NWQtY2YwMC00NTM1LWEyZGUtNmNlYWQzNWM4OWI5IiwiZW1haWwiOiJ0ZW54aW4yMDE2QGdtYWlsLmNvbSJ9.M0IyMxvlgHBTb4kahbtPZhv5KcMo5CHEIzR198O0EMxTsWZUkMt0mdannBEiZe4iq9ikvIne85Bcp4XX2KvyUtwevI_8M50tq4nbdj_3AJXR9hhNuPE_S8tB1hd84JqJ7ng9zXRer3z2upwDXS5ckvs56hutgUTv5pUBXMGXlihR1Kb9752V73btKGx5OfBt0my9_jC6MwpyLLjC-O7molVqZstS38vGrSQKnotQXzKK9snSZGvqhHz8eFwOH4XqThKOHqknwjry0HQbUGWHn2Pr8AYNImGLxCf7C3d2Rr_yCxUrQU0Kh__35iTCnjzZQIBXjkdp5AbxY1CR0tl4zg';

    return this.http.post<IDelivered>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        // Authorization: `Bearer ${token}`,
      }),
    });
  }
  public SMTPComplaintNotifications() {
    let url =
      'https://ytvoakqcha.execute-api.ap-southeast-1.amazonaws.com/dev/complaint';
    return this.http.post<IDelivered>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    });
  }
  public SMTPDeliveryNotifications() {
    let url =
      'https://ytvoakqcha.execute-api.ap-southeast-1.amazonaws.com/dev/delivered';
    // 'https://m3p7m3x86h.execute-api.ap-southeast-1.amazonaws.com/test/delivered';

    return this.http.post<IDelivered>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    });
  }
  public SMTPClickNotifications() {
    let url =
      'https://ytvoakqcha.execute-api.ap-southeast-1.amazonaws.com/dev/click';
    return this.http.post<IClick>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    });
  }
  public SMTPOpenNotifications() {
    let url =
      'https://ytvoakqcha.execute-api.ap-southeast-1.amazonaws.com/dev/open';
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
