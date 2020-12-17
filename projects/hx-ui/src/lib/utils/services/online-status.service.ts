import { Injectable } from '@angular/core';
import {Observable, fromEvent, merge} from 'rxjs/index';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OnlineStatusService {

  public online$: Observable<Event> = fromEvent(window, 'online');
  public offline$: Observable<Event> = fromEvent(window, 'offline');
  public isOnline$: Observable<boolean> = merge(this.online$, this.offline$).pipe(map(ev => ev.type === 'online'));

  constructor() { }
}
