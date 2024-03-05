import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  constructor(private http: HttpClient) { }
  emittedValue: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public triggerMethodSubject = new Subject<void>();

  emitValue(Event: any) {
    this.triggerMethodSubject.next(Event);
    this.emittedValue.next(Event);
  }
  
  GetBackendData() {
    return this.http.get('http://localhost:3000/todo');
  }

  DeleteData(index: number) {
    return this.http.get(`http://localhost:3000/delete/${index}`);
  }

  CreateData(a:any,b:any){
    return this.http.post('http://localhost:3000/create',[a,b]);
  }

  EditData(a:any,b:any,c:any){
    return this.http.post('http://localhost:3000/update',[a,b,c]);
  }

  triggerMethod() {
    this.triggerMethodSubject.next();
  } 
}
