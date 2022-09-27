import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  members: any[] = [
    {
      id: 1,
      name: 'Jack',
      date: '01-06-2017',
    },
    {
      id: 2,
      name: 'Allen',
      date: '07-08-2017',
    },
    {
      id: 3,
      name: 'Annie',
      date: '22-11-2017',
    },
    {
      id: 4,
      name: 'Tenzin',
      date: '2-11-2018',
    },
  ];

  deliveryData: any = [];
  complaintData: any = [];
  productData: any = [];
  bounceData: any = [];
  clickData: any = [];
  openData: any = [];
  searchText: any;
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
    this.getData();
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
    }
    // if (this.searchText == '') {
    //   this.getSMTPComplaintNotification;
    // } else {
    //   this.complaintData = this.complaintData.filter((res: any) => {
    //     return res.searchText
    //       .toLocaleLowerCase()
    //       .match(this.searchText.toLocaleLowerCase());
    //   });
    // }
    // if (this.searchText == '') {
    //   this.getSMTPBounceNotification;
    // } else {
    //   this.bounceData = this.bounceData.filter((res: any) => {
    //     return res.searchText
    //       .toLocaleLowerCase()
    //       .match(this.searchText.toLocaleLowerCase());
    //   });
    // }
    // if (this.searchText == '') {
    //   this.getSMTPOpenNotification;
    // } else {
    //   this.openData = this.openData.filter((res: any) => {
    //     return res.searchText
    //       .toLocaleLowerCase()
    //       .match(this.searchText.toLocaleLowerCase());
    //   });
    // }
    // if (this.searchText == '') {
    //   this.getSMTPClickNotification;
    // } else {
    //   this.clickData = this.clickData.filter((res: any) => {
    //     return res.searchText
    //       .toLocaleLowerCase()
    //       .match(this.searchText.toLocaleLowerCase());
    //   });
    // }
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
  getData() {
    this.productData = this.apiService.getAllProducts();
  }
  filterDateRange($event: any) {
    let startDate = $event[0].toJSON().split('T')[0];
    let endDate = $event[1].toJSON().split('T')[0];
    console.log(startDate);
    console.log(endDate);
    this.productData = this.productData.filter(
      (m: any) =>
        new Date(m.CreatedDate) >= new Date(startDate) &&
        new Date(m.CreatedDate) <= new Date(endDate)
    );
  }
  // filterDate() {
  //   let startDate = this.fromDate;
  //   let formatedDate = moment(this.fromDate).format('YYYY/MM/DD');
  //   console.log(formatedDate);

  //   console.log(startDate);

  //   let endDate = '06-07-2017';
  //   let selectedMembers = this.members.filter(
  //     (m: any) => new Date(m.date) == new Date(startDate)

  //     // new Date(m.date) <= new Date(endDate)
  //   );

  //   console.log(selectedMembers);
  //   console.log(this.members);
  // }
}
