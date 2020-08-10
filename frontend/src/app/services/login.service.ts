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

  getConcerts() {
    return this.http.get(this.URL_API + 'getConcerts');
  }

  sendConcertInfo(idConcert: string) {
    return this.http.post(this.URL_API + 'ticketInfo', {
      idConcert: idConcert
    });
  }

  sendOwnerAndConcert(ownerDID: string, concertID: string) {
    return this.http.post(this.URL_API + 'updateUser', {
      ownerDID: ownerDID,
      concertID: concertID
    });
  }

  getConcertsByUser(did: string) {
    return this.http.get(this.URL_API + 'findUserByDID/' + did);
  }

  getConcertByID(idConcert: string) {
    return this.http.get(this.URL_API + 'getConcert/' + idConcert);
  }

}
