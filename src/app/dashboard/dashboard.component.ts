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
  endPage: number = 2;
  startPage: number = 0;
  filterdPost: any;
  pageNumber: number = 1;
  pagination: boolean = true;
  postCount: number = 0;

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
  gotoPreviousPage() {
    this.endPage = this.startPage;
    this.startPage = this.startPage - 2;

    this.filterdPost = this.slicePost();
    this.pageNumber--;
    this.checkPagination();
  }
  gottoNextPage() {
    this.startPage = this.endPage;
    this.endPage = this.endPage + 2;

    this.filterdPost = this.slicePost();

    this.pageNumber++;
    this.checkPagination();
  }
  checkPagination() {
    if (this.startPage >= 0 && this.endPage < this.postCount) {
      this.pagination = true;
    } else {
      this.pagination = false;
    }
  }
  slicePost() {
    return this.deliveryData.slice(this.startPage, this.endPage);
  }
  signOut() {
    this.authService.signOut().then(() => {
      console.log('signout successfully');
      this.router.navigate(['/login']);
    });
  }
}
