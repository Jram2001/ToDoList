import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  constructor(private http: HttpClient) { }
  emittedValue: BehaviorSubject<any> = new BehaviorSubject<any>(true);
  public triggerMethodSubject = new Subject<void>();
  currentuser : BehaviorSubject<any> = new BehaviorSubject<any>('');

  emitValue(Event: any) { 
    this.triggerMethodSubject.next(Event[0]);
    this.emittedValue.next(Event);
  }

  GetBackendData() {
    return this.http.post('http://localhost:3000/todo',{"userId" : 26} );
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
    return this.http.post('http://localhost:3000/validate',data)
  }

  CreateUser(data:any){
    return this.http.post('http://localhost:3000/CreateMyUser',data)
  }

  VerifyToken( data:any ){
    console.log(localStorage.getItem('user'))
    return this.http.post('http://localhost:3000/ValidateToken',{"user" : localStorage.getItem('user')},{headers : data})
  }

  ValidateUser(){
    const token  =  localStorage.getItem('Token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.VerifyToken(headers).subscribe(x => console.log(x))
      return this.VerifyToken(headers);
  }
}
