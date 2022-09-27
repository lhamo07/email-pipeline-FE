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
  employees!: any[];

  getAllProducts() {
    return (this.employees = [
      {
        ProductId: 1,
        ArtNo: '100',
        Provider: 'OppoProvider',
        ProviderArtNo: '1Yu',
        Brand: 'Oppo',
        Price: 7810.23,
        BuyAccount: '123',
        SalesAccount: '321',
        CreatedDate: '2020-04-17',
      },
      {
        ProductId: 1,
        ArtNo: '101',
        Provider: 'OppoProvider',
        ProviderArtNo: '1Yu',
        Brand: 'Oppo',
        Price: 2310.23,
        BuyAccount: '123',
        SalesAccount: '321',
        CreatedDate: '2020-04-15',
      },
      {
        ProductId: 1,
        ArtNo: '102',
        Provider: 'OppoProvider',
        ProviderArtNo: '1Yu',
        Brand: 'Oppo',
        Price: 7810.23,
        BuyAccount: '123',
        SalesAccount: '321',
        CreatedDate: '2020-04-11',
      },
      {
        ProductId: 1,
        ArtNo: '103',
        Provider: 'OppoProvider',
        ProviderArtNo: '1Yu',
        Brand: 'Oppo',
        Price: 5810.23,
        BuyAccount: '123',
        SalesAccount: '321',
        CreatedDate: '2020-03-21',
      },
      {
        ProductId: 1,
        ArtNo: '104',
        Provider: 'OppoProvider',
        ProviderArtNo: '1Yu',
        Brand: 'Oppo',
        Price: 4770.23,
        BuyAccount: '143',
        SalesAccount: '211',
        CreatedDate: '2021-03-01',
      },
    ]);
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
