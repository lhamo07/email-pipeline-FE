import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  bounceData: any = [];
  complaintData: any = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getBounceNotification();
  }
  getBounceNotification() {
    this.apiService.smtpBounceNotification().subscribe((res) => {
      this.bounceData = res.delivered;
      console.log(this.bounceData);
    });
  }
  getSMTPComplaintNotifications() {
    this.apiService.SMTPComplaintNotifications().subscribe((res) => {
      this.complaintData = res.delivered;
    });
  }
}
