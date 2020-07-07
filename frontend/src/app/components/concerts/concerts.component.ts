import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.css']
})
export class ConcertsComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
   this.loginService.getConcertsByUser('did:ethr:0xb50df7f85f0c812e99c3f95f209fb6a2d8e934b5')
   .subscribe(res => {
    console.log(res);
  }, err => {
  });
  }

}
