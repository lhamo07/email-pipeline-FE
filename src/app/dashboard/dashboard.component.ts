import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  deliveryData: any = [];
  complaintData: any = [];
  productData: any = [];
  bounceData: any = [];
  clickData: any = [];
  openData: any = [];
  searchText: any;
  searchDate: any;
  p: number = 1;
  fromDate!: Date;
  toDate!: Date;
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSMTPDeliveryNotification();
  }
  getSMTPDeliveryNotification() {
    this.apiService.SMTPDeliveryNotifications().subscribe((res) => {
      this.deliveryData = res.delivered;
    });
  }
  getSMTPComplaintNotification() {
    this.apiService.SMTPComplaintNotifications().subscribe((res) => {
      this.complaintData = res.delivered;
    });
  }
  getSMTPBounceNotification() {
    this.apiService.smtpBounceNotification().subscribe((res) => {
      this.bounceData = res.delivered;
    });
  }
  getSMTPOpenNotification() {
    this.apiService.SMTPOpenNotifications().subscribe((res) => {
      this.openData = res.open;
    });
  }
  getSMTPClickNotification() {
    this.apiService.SMTPClickNotifications().subscribe((res) => {
      this.clickData = res.click;
    });
  }
  //search
  search() {
    if (this.searchText == ' ') {
      this.getSMTPDeliveryNotification();
      this.getSMTPComplaintNotification();
      this.getSMTPBounceNotification();
      this.getSMTPOpenNotification();
      this.getSMTPClickNotification();
    } else {
      this.deliveryData = this.deliveryData.filter(
        (res: { searchText: string }) => {
          return res.searchText
            .toLocaleLowerCase()
            .match(this.searchText.toLocaleLowerCase());
        }
      );

      this.bounceData = this.bounceData.filter((res: any) => {
        return res.searchText
          .toLocaleLowerCase()
          .match(this.searchText.toLocaleLowerCase());
      });

      this.complaintData = this.complaintData.filter((res: any) => {
        return res.searchText
          .toLocaleLowerCase()
          .match(this.searchText.toLocaleLowerCase());
      });
      this.openData = this.openData.filter((res: any) => {
        return res.searchText
          .toLocaleLowerCase()
          .match(this.searchText.toLocaleLowerCase());
      });
      this.clickData = this.clickData.filter((res: any) => {
        return res.searchText
          .toLocaleLowerCase()
          .match(this.searchText.toLocaleLowerCase());
      });
    }
    console.log('search data', this.deliveryData);
  }
  //Pagination

  signOut() {
    this.authService.signOut().then(() => {
      console.log('signout successfully');
      this.router.navigate(['/login']);
    });
  }
  //dropdown
  selectChangeHandler(value: any) {
    if (value == 'delivery') {
      this.apiService.SMTPDeliveryNotifications().subscribe((res) => {
        this.deliveryData = res.delivered;
        this.p = 1;
      });
    } else if (value == 'complaint') {
      this.apiService.SMTPComplaintNotifications().subscribe((res) => {
        this.complaintData = res.delivered;
        this.p = 1;
      });
    } else if (value == 'bounce') {
      this.apiService.smtpBounceNotification().subscribe((res) => {
        this.bounceData = res.delivered;
        this.p = 1;
      });
    } else if (value == 'click') {
      this.apiService.SMTPClickNotifications().subscribe((res) => {
        this.clickData = res.click;
        this.p = 1;
      });
    } else {
      this.apiService.SMTPOpenNotifications().subscribe((res) => {
        this.openData = res.open;
        this.p = 1;
      });
    }
  }
  // date range Filter
  getData() {
    this.deliveryData = this.apiService.SMTPDeliveryNotifications();
    this.bounceData = this.apiService.smtpBounceNotification();
  }
  filterDateRange($event: any) {
    if (this.searchDate == '') {
      this.getSMTPDeliveryNotification();
      this.getSMTPBounceNotification();
    } else {
      let startDate = $event[0].toJSON().split('T')[0];
      let endDate = $event[1].toJSON().split('T')[0];
      console.log(startDate);
      console.log(endDate);
      this.deliveryData = this.deliveryData.filter(
        (m: any) =>
          new Date(m.SnsPublishTime) >= new Date(startDate) &&
          new Date(m.SnsPublishTime) <= new Date(endDate)
      );

      this.bounceData = this.bounceData.filter(
        (b: any) =>
          new Date(b.SnsPublishTime) >= new Date(startDate) &&
          new Date(b.SnsPublishTime) <= new Date(endDate)
      );
      console.log(this.bounceData);
    }
  }
  ResetData() {
    this.getSMTPDeliveryNotification();
    this.getSMTPBounceNotification();
  }
}
