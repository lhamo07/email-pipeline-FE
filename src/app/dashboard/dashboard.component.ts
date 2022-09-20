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
  bounceData: any = [];
  clickData: any = [];
  openData: any = [];
  endPage: number = 3;
  startPage: number = 0;
  filterdPost: any;
  pageNumber: number = 1;
  pagination: boolean = true;
  postCount: number = 0;
  searchText: any;
  p: number = 1;

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
      console.log(this.deliveryData);
    });
  }
  getSMTPComplaintNotification() {
    this.apiService.SMTPComplaintNotifications().subscribe((res) => {
      this.complaintData = res.delivered;
      console.log(this.complaintData);
    });
  }
  getSMTPBounceNotification() {
    this.apiService.smtpBounceNotification().subscribe((res) => {
      this.bounceData = res.delivered;
      console.log(this.bounceData);
    });
  }
  getSMTPOpenNotification() {
    this.apiService.SMTPOpenNotifications().subscribe((res) => {
      this.openData = res.open;
      console.log(this.openData);
    });
  }
  getSMTPClickNotification() {
    this.apiService.SMTPClickNotifications().subscribe((res) => {
      this.clickData = res.click;
      console.log(this.clickData);
    });
  }
  //search
  search() {
    if (this.searchText == ' ') {
      this.getSMTPDeliveryNotification();
    } else {
      this.deliveryData = this.deliveryData.filter(
        (res: { searchText: string }) => {
          return res.searchText
            .toLocaleLowerCase()
            .match(this.searchText.toLocaleLowerCase());
        }
      );
    }
    if (this.searchText == '') {
      this.getSMTPComplaintNotification;
    } else {
      this.complaintData = this.complaintData.filter((res: any) => {
        return res.searchText
          .toLocaleLowerCase()
          .match(this.searchText.toLocaleLowerCase());
      });
    }
    if (this.searchText == '') {
      this.getSMTPBounceNotification;
    } else {
      this.bounceData = this.bounceData.filter((res: any) => {
        return res.searchText
          .toLocaleLowerCase()
          .match(this.searchText.toLocaleLowerCase());
      });
    }
    if (this.searchText == '') {
      this.getSMTPOpenNotification;
    } else {
      this.openData = this.openData.filter((res: any) => {
        return res.searchText
          .toLocaleLowerCase()
          .match(this.searchText.toLocaleLowerCase());
      });
    }
    if (this.searchText == '') {
      this.getSMTPClickNotification;
    } else {
      this.clickData = this.clickData.filter((res: any) => {
        return res.searchText
          .toLocaleLowerCase()
          .match(this.searchText.toLocaleLowerCase());
      });
    }
  }
  //Pagination

  signOut() {
    this.authService.signOut().then(() => {
      console.log('signout successfully');
      this.router.navigate(['/login']);
    });
  }
  selectChangeHandler(value: any) {
    if (value == 'delivery') {
      this.apiService.SMTPDeliveryNotifications().subscribe((res) => {
        this.deliveryData = res.delivered;
        console.log(this.deliveryData);
      });
    } else if (value == 'complaint') {
      this.apiService.SMTPComplaintNotifications().subscribe((res) => {
        this.complaintData = res.delivered;
        console.log(this.complaintData);
      });

      console.log('complaint');
    } else if (value == 'bounce') {
      this.apiService.smtpBounceNotification().subscribe((res) => {
        this.bounceData = res.delivered;
        console.log(this.bounceData);
      });

      console.log('bounce');
    } else if (value == 'click') {
      this.apiService.SMTPClickNotifications().subscribe((res) => {
        this.clickData = res.click;
        console.log(this.clickData);
      });

      console.log('bounce');
    } else {
      this.apiService.SMTPOpenNotifications().subscribe((res) => {
        this.openData = res.open;
        console.log(this.openData);
      });
    }
  }
}
