import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly URL_API = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getQR() {
    return this.http.get(this.URL_API);
  }

  sendConcertInfo(img: string, singer: string, price: string, location: string, date: string, time: string) {
    return this.http.post(this.URL_API + 'ticketInfo', {
      img: img,
      singer: singer,
      price: price,
      location: location,
      date: date,
      time: time
    });
  }
}
