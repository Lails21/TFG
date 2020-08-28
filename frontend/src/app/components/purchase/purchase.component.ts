import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Concert } from 'src/app/models/concert';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent implements OnInit {
  public successShow = false;
  public failShow = false;
  public digitalShow = false;
  public xldigitalShow = false;
  public xldigitalShowFail = false;
  public xldigitalShowSuccess = false;
  public loginStatus = true;
  username: string;
  password: string;
  i: string;
  id: string;
  qr: any;


  constructor(private data: DataService, private loginService: LoginService, private activatedRouter: ActivatedRoute, private router: Router) {}

  concertsList: Concert[] = [];
  concert: Concert = new Concert();

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      if (typeof params.idConcert !== 'undefined') {
        this.loginService.getConcertByID(params.idConcert)
        .subscribe(res => {
          console.log(res);
          this.concert = res as Concert;
        }, err => {
        });
      }
    });
    this.getQR();
  }

  goToPurchaseSummary() {
    this.xldigitalShow = true;
  }

  goBack() {
    this.xldigitalShow = true;
    this.xldigitalShowSuccess = false;
  }

  getQR() {
    this.loginService.getQR().subscribe((res: any) => {
      console.log(res);
      this.qr = res.qr.toString();
    });
  }
}
