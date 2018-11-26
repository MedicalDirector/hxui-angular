import { Injectable } from '@angular/core';
import {Observable, fromEvent} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class OnlineStatusService {

  public online: Observable<Event> = fromEvent(window, 'online');
  public offline: Observable<Event> = fromEvent(window, 'offline');

  constructor() { }
}
