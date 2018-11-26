import { Injectable } from '@angular/core';
import {Observable, fromEvent} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class OnlineStatusService {

  public onlineStatus: Observable<Event> = fromEvent(window, 'online');
  public offlineStatus: Observable<Event> = fromEvent(window, 'offline');

  constructor() { }
}
