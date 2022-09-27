import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-filter-by-date',
  templateUrl: './filter-by-date.component.html',
  styleUrls: ['./filter-by-date.component.scss'],
})
export class FilterByDateComponent implements OnInit {
  products: any = [];
  tempproducts: any = [];
  constructor(private datepickerService: ApiService) {}

  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.products = this.datepickerService.getAllProducts();
    this.tempproducts = this.datepickerService.getAllProducts();
  }
  dateCreated($event: any) {
    this.products = this.tempproducts;
    this.products = this.products.filter(
      (x: any) => x.CreatedDate == $event.toJSON().split('T')[0]
    );
  }
  dateRangeCreated($event: any) {
    this.products = this.tempproducts;
    let startDate = $event[0].toJSON().split('T')[0];
    let endDate = $event[1].toJSON().split('T')[0];
    this.products = this.products.filter(
      (m: any) =>
        new Date(m.CreatedDate) >= new Date(startDate) &&
        new Date(m.CreatedDate) <= new Date(endDate)
    );
  }
}
