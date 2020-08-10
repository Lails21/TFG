import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-qr-friend',
  templateUrl: './qr-friend.component.html',
  styleUrls: ['./qr-friend.component.css']
})
export class QrFriendComponent implements OnInit {

  qr: any;
  ownerDID: string;
  concertID: string;

  constructor(private loginService: LoginService, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.ownerDID = this.dataService.ownerDID;
    this.concertID = this.dataService.concertID;
    console.log(this.concertID);
    console.log(this.ownerDID);
    this.loginService.sendOwnerAndConcert(this.ownerDID, this.concertID)
    .subscribe(res => {

    }, err => {
    });
    this.loginService.getQR().subscribe((res: any) => {
        console.log(res);
        this.qr = res.qr.toString();
      });
    }
}
