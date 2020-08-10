import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Concert } from 'src/app/models/concert';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {

  constructor(private loginService: LoginService, private activatedRouter: ActivatedRoute, private router: Router, private dataService: DataService) { }

  i: string;
  format: boolean;
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
    this.dataService.concertID = this.concert._id;
    this.loginService.sendConcertInfo(this.concert._id)
      .subscribe(res => {

      }, err => {
      });
  }

  getFriendDID() {
    if (this.didFriend === undefined) {
      console.log('INSERT YOUR FRIENDs DID');
    } else {
      this.format = this.didFriend.startsWith('did:ethr:0x');
      if (this.format === false) {
            console.log('WRONG FORMAT OF THE DID');
          } else {
            this.router.navigate(['/qrFriend']);
          }
    }
  }

}
