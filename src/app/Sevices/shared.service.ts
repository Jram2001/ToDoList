import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  emittedValue: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor() { }
  emitValue(Event:any){
        this.emittedValue.next(Event)

  }
}
