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
    //   'eyJraWQiOiJaUXcyYnk2WFwvU2orNjdBSkVaZnB0dHJkamU1dVp4MGZReWtRbjQ3RERYUT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhMWI3OWEwOC0yNTFhLTQ1MGYtYmM3Zi1iZjM1MTM1YWFiNDAiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX1c3WFZXc2lHMSIsImNvZ25pdG86dXNlcm5hbWUiOiJhMWI3OWEwOC0yNTFhLTQ1MGYtYmM3Zi1iZjM1MTM1YWFiNDAiLCJvcmlnaW5fanRpIjoiMTFiZjM5M2UtMGM0Ni00Mzc0LWIwNmUtMTc4NWY0NDZkNTk5IiwiYXVkIjoiM2IwM2ppMXZqdWRmMGZxbG00OGdqa245dDMiLCJldmVudF9pZCI6ImNiY2ZjODRmLTUxNTgtNDU1Ny1hN2FmLTk1ZmRiY2VlODdkMSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjY1NDY3Mjk2LCJleHAiOjE2NjU0NzA4OTYsImlhdCI6MTY2NTQ2NzI5NiwianRpIjoiYzVlYWIzY2UtNzc3My00MjRmLTkxMjYtZTY0MTg3MjQ2NWM4IiwiZW1haWwiOiJ0ZW56aW4ubGhhbW9AZ2VuZXNlc29sdXRpb24uY29tIn0.Ox9b_1w7ZuzE27vJnvAOxh5JMbIlU7iWnLshI4gRsyRIZXCPN0SXf3ErlMFX_D6-yjmx5y1HfffpUIw6S1HBft0ZsQAGDD9lt0PSMtweH_0BJSyiQfFBlaGEU7sBz-oc29JbNrrKhKHnnSbZRIDO3oBJ0259nDSaDbNlR50VTnbJFlDydeCbm1xPQt1ByZX3gFkgHv_WreBykPdwXsEVrM-c_RhAUwIkaLKM7iowdA89dvppigZtcMLkQdnfYaIqLIjN9Xtooo3UK_0JtOCYcSNWL9RrjXq_rbTpgihXV8awRl2vTu1GeQweCEK1pLR3MSfRso7g4w5iH0NbqCpcUQ';

    return this.http.post<IDelivered>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        // Authorization: `localStorage.getItem('CognitoIdentityServiceProvider.3b03ji1vjudf0fqlm48gjkn9t3.LastAuthUser')`,
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
      'https://m3p7m3x86h.execute-api.ap-southeast-1.amazonaws.com/test/delivered';
    // 'https://m3p7m3x86h.execute-api.ap-southeast-1.amazonaws.com/test/delivered';

    return this.http.post<IDelivered>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        // Authorization: token,
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
