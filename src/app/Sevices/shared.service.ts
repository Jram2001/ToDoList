import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  constructor(private http: HttpClient) { }
  TaskDta: BehaviorSubject<any> = new BehaviorSubject<any>({});
  TagData: BehaviorSubject<any> = new BehaviorSubject<any>({});
  emittedValue: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  emitValue(Event: any) {
    this.emittedValue.next(Event)
  }
  GetBackendData() {
    console.log('clo')
    this.http.get('http://localhost:3000/todo').subscribe((Data: any) => { this.TaskDta.next(Data.taskDeatils); this.TagData.next(Data.TagDetail) });
  }
  DeleteData(index: number) {
    console.log(index)
    this.http.get(`http://localhost:3000/delete/${index}`).subscribe(x => this.GetBackendData())
  }
}
