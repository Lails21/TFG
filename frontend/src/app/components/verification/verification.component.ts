import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  qr: any;
  ioConnection: any;

  constructor(private loginService: LoginService, private router: ActivatedRoute,
              private dataService: DataService, private toastService: ToastrService) { }

  ngOnInit() {
    this.getQRVerification();
    this.initIoConnection();
  }


  getQRVerification() {
    this.loginService.getQRVerification().subscribe((res: any) => {
      console.log(res);
      this.qr = res.qr.toString();
    });
  }

  private initIoConnection(): void {
    this.ioConnection = this.dataService.onMessage()
    .subscribe((message: any) => {
      console.log(message)
      if (message === 'ACCESS GRANTED') {
        this.toastService.error('ACCESS GRANTED');
      } else {
        this.toastService.error('ACCESS DENIED');
      }
    });
  }

}
