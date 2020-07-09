import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Concert } from 'src/app/models/concert';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {

  constructor(private loginService: LoginService, private activatedRouter: ActivatedRoute, private router: Router) { }

  i: string;
  public shouldShow = true;
  didFriend: string;
  concert: Concert = new Concert();
  qr: any;

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      if (typeof params.idConcert !== 'undefined') {
        this.loginService.getConcertByID(params.idConcert)
        .subscribe(res => {
          this.concert = res as Concert;
          this.getConcertInfo();
        }, err => {
        });
      }
    });
  }

  getConcertInfo() {
    console.log(this.concert._id);
    this.loginService.sendConcertInfo(this.concert._id)
      .subscribe(res => {

      }, err => {
      });
  }

  getFriendDID() {
    console.log(this.didFriend);
    if(this.didFriend === undefined){
      console.log('DO NOTHING')
    } else {
      this.router.navigate(['/qrFriend']);
    }
  }

}
