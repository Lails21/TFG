import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Concert } from 'src/app/models/concert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.css']
})
export class ConcertsComponent implements OnInit {

  concertsUser: Concert[] = [];
  didOwner: string;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {

  }

  viewConcert(_id: string) {
    console.log(_id);
    this.router.navigate(['/exchange', _id]);
  }

  getOwnerDID() {
    this.loginService.getConcertsByUser(this.didOwner)
   .subscribe(res => {
     console.log(res);
     this.concertsUser = res as Concert[];
  }, err => {
  });
  }

}
