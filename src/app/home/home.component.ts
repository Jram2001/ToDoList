import { Component, EventEmitter, NgModule, Output, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../Sevices/shared.service';
import { DatePipe } from '@angular/common';
import { AppComponent } from '../app.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule , DatePipe , AppComponent , DatePipe , MatIconModule,FlexLayoutModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  datepipe: DatePipe;
  constructor(private SharedService: SharedService) {
    this.datepipe = new DatePipe('en-US');
  }
  UserName = localStorage.getItem('user');
  emittedValue: boolean = true;
  tasks: any = [];
  Todaysdate = new Date();
  taskDate!: Date;
  Color: any;
  TagData: any = [];
  Arrayoftagdata: any = [];
  index: number = 0;
  dataLoaded: boolean = false;

  emit(Event: any) {
    this.SharedService.emitValue([-1, this.emittedValue])
    this.emittedValue = !this.emittedValue;
  }

  editemiter(Index: any) {
    this.SharedService.emitValue([Index, true])
    this.emittedValue = false;
  }
  ngAfterViewInit() {
    this.SharedService.currentuser.subscribe(x => console.log(x,'lol'))
    this.SharedService.ValidateUser();
    this.SharedService.triggerMethodSubject.subscribe((x: any) => {
      this.getData();
    });
    this.getData();
  }

  getData() {
    this.SharedService.GetBackendData().subscribe((Data: any) => {
      this.tasks = Data;
      this.dataLoaded = true;
      console.log(this.tasks,'lol')
    });
  }

  deleteData(index: number) {
    this.SharedService.DeleteData(index).subscribe((x: any) => { this.getData() });
  }

  myColor(index: any) {
    this.taskDate = new Date(this.tasks[index].CreatedOn);
    let DiffrenceInHours = this.taskDate.getHours() - this.Todaysdate.getHours();
    let DiffrenceInDays = DiffrenceInHours / (86400000);
    if ((DiffrenceInDays < 1 || this.tasks[index].Repetable == 1) && DiffrenceInHours > 0) {
      return ['#a3ff82']
    }
    else {
      return ['#ff2929']
    }
  }

  updateTimer(index: any) {
    setInterval(() => {
      this.taskDate = new Date(this.tasks[index].CreatedOn);
      return this.datepipe.transform(new Date(this.taskDate.getTime() - this.Todaysdate.getTime()), 'HH:mm:ss') || new Date("00:00:00");
    }, 1000);
  }


}

