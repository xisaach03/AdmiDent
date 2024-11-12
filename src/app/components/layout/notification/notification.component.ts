import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from '../../../services/socket.service';


@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  showModal: boolean = false;
  message: string = '';

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.listenToNotifications((message: string) => {
      this.message = message;
      this.showModal = true;
    })
  }

  closeModal(): void {
    this.showModal = false;
  }
}