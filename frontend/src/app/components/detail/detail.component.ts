import { Component, OnInit } from '@angular/core';
import { Concert } from 'src/app/models/concert';
import { DataService } from 'src/app/services/data.service';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  i: string;
  public shouldShow = true;
  constructor(private data: DataService, private loginService: LoginService, private activatedRouter: ActivatedRoute, private router: Router) { }

  concertsList: Concert[] = [];
  concert: Concert = new Concert();

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

  viewConcert(_id: string) {
    console.log(_id);
    this.router.navigate(['/purchase', _id]);
  }

}



