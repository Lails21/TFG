import { Component, OnInit } from '@angular/core';
import { Concert } from 'src/app/models/concert';
import { DataService } from 'src/app/services/data.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  i: string;

  concertsList: Concert[] = [];

  constructor(private data: DataService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginService.getConcerts()
    .subscribe(res => {
      this.concertsList = res as Concert[];
      console.log(this.concertsList);
    }, err => {
    });
  }

  viewConcert(_id: string) {
    console.log(_id);
    this.router.navigate(['/detail', _id]);
  }

}
