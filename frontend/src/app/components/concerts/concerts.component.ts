import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Concert } from 'src/app/models/concert';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserConcerts } from 'src/app/models/user-concerts';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.css']
})
export class ConcertsComponent implements OnInit {

  concertsUser: UserConcerts[] = [];
  isHidden: boolean = true;
  didOwner: string;
  format: boolean;
  total: string;
  concertPrice: number;
  totalConcerts: number = 0;

  constructor(private loginService: LoginService, private router: Router, private toastService: ToastrService, private dataService: DataService) { }

  ngOnInit() {

  }

  viewConcert(_id: string) {
    console.log(_id);
    this.router.navigate(['/exchange', _id]);
  }

  getOwnerDID() {
    if (this.didOwner === undefined) {
      this.toastService.error('INSERT YOUR DID, PLEASE');
    } else {
      this.format = this.didOwner.startsWith('did:ethr:0x');
      this.dataService.ownerDID = this.didOwner;
      if (this.format === false) {
            this.toastService.error('WRONG FORMAT OF THE DID');
          } else {
            this.loginService.getConcertsByUser(this.didOwner)
            .subscribe(res => {
              this.isHidden = false;
              this.concertsUser = res as UserConcerts[];
              for (let i = 0; i < this.concertsUser.length; i++) {
                console.log(this.concertsUser[i].concert.singer)
                this.concertPrice = parseInt(this.concertsUser[i].concert.price);
                this.total = (this.concertPrice + this.totalConcerts).toFixed(2).replace('.', ',');
                this.totalConcerts = this.concertPrice;
              }
           }, err => {
           });          }
    }
  }

}
