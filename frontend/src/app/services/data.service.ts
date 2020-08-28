import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  ownerDID: string;
  concertID: string;

  constructor(private socketService: Socket) {
  }

  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socketService.on('message', (data: any) => observer.next(data))
    })
  }
}
