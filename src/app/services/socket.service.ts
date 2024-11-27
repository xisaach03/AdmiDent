import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket | undefined
  private readonly SERVER_URL = environment.apiUrl;

  constructor() { 
    //if (typeof window === 'undefined') return;
    this.socket = io(this.SERVER_URL);
  }

  listenToNotifications(cb: Function) {
    if(this.socket){
      this.socket.on('notificationReceived', (message: string) => {
        this.socket!.emit('sendNotification', message);
        cb(message)
      });
    }
  }
  
}
