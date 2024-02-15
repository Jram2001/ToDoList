import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
    constructor( private http : HttpClient ) { }

  emittedValue: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  emitValue(Event:any){
      this.emittedValue.next(Event)
  }
  GetBackendData():any{
    this.http.get("http://localhost:4200/todo");
  }
}
