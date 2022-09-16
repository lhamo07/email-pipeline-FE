import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastNotificationService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string) {
    return this.toastr.success(message);
  }
  showError(message: any) {
    return this.toastr.error(message);
  }
}
