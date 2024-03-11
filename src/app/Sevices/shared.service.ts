import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  constructor(private http: HttpClient) { }
  emittedValue: BehaviorSubject<any> = new BehaviorSubject<any>(true);
  public triggerMethodSubject = new Subject<void>();

  emitValue(Event: any) {
    this.triggerMethodSubject.next(Event[0]);
    this.emittedValue.next(Event);
  }

  GetBackendData() {
    return this.http.get('http://localhost:3000/todo');
  }

  DeleteData(index: number) {
    return this.http.get(`http://localhost:3000/delete/${index}`);
  }

  CreateData(a: any, b: any) {
    console.log('hello', a, b)
    return this.http.post('http://localhost:3000/create', [a, b]);
  }

  EditData(a: any, b: any, c: any) {
    return this.http.post('http://localhost:3000/update', [a, b, c]);
  }

  triggerMethod() {
    this.triggerMethodSubject.next();
  }

  login(data:any){
    console.log(data)
    return this.http.post('http://localhost:3000/validate',[data])
  }

  CreateUser(data:any){
        console.log(data)

    return this.http.post('http://localhost:3000/CreateMyUser',[data])
  }
}
