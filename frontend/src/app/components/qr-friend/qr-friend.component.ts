import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-friend',
  templateUrl: './qr-friend.component.html',
  styleUrls: ['./qr-friend.component.css']
})
export class QrFriendComponent implements OnInit {

  qr: any;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginService.getQR().subscribe((res: any) => {
        console.log(res);
        this.qr = res.qr.toString();
      });
    }
}
