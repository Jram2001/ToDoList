import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  constructor( private http : HttpClient ) { }
  TaskDta : BehaviorSubject<any> = new BehaviorSubject<any>({});
  emittedValue: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  emitValue(Event:any){
      this.emittedValue.next(Event)
  }
  GetBackendData(){
     this.http.get('http://localhost:3000/todo').subscribe((Data:any) => this.TaskDta.next(Data));
  }
}
