import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewUserService {

  showModal : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  isShowed = this.showModal;
  
  constructor() { }
}
