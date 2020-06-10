import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Concert } from 'src/app/models/concert';
import { LoginService } from 'src/app/services/login.service';

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

  constructor(private data: DataService, private loginService: LoginService) {}

  concertsList: Concert[] = [
    {
      img: 'rosalia.jpg',
      singer: "ROSALÍA",
      price: "99,00€",
      location: "Palau Sant Jordi, Barcelona",
      date: "29/10/2020",
      time: "21:00h",
    },
    {
      img: "beyonce.jpg",
      singer: "BEYONCÉ KNOWLES",
      price: "129,00€",
      location: "Madison Square Garden, New York",
      date: "2/7/2020",
      time: "20:30h",
    },
    {
      img: "ladygaga.jpg",
      singer: "LADY GAGA",
      price: "110,00€",
      location: "Park Theater, Las Vegas",
      date: "9/9/2020",
      time: "19:00h",
    },
    {
      img: "dualipa.jpg",
      singer: "DUA LIPA",
      price: "49,00€",
      location: "Staples Center, Los Angeles",
      date: "12/11/2020",
      time: "22:00h",
    },
    {
      img: "beret.jpg",
      singer: "BERET",
      price: "39,00€",
      location: "Razzmatazz, Barcelona",
      date: "19/8/2020",
      time: "18:30h",
    },
    {
      img: "brunomars.jpg",
      singer: "BRUNO MARS",
      price: "89,00€",
      location: "Palau Sant Jordi, Barcelona",
      date: "12/8/2020",
      time: "19:30h",
    },
    {
      img: "edsheeran.jpg",
      singer: "ED SHEERAN",
      price: "99,00€",
      location: "THE O2 Arena, London",
      date: "12/11/2020",
      time: "20:30h",
    },
    {
      img: "madonna.jpg",
      singer: "MADONNA",
      price: "139,00€",
      location: "Wembley Stadium, London",
      date: "22/8/2020",
      time: "21:30h",
    },
  ];

  ngOnInit() {
    this.data.currentMessage.subscribe((i) => (this.i = i));
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
      this.qr = res.qr.toString();
    });
  }
}
