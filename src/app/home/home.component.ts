import { Component, EventEmitter, NgModule, Output, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../Sevices/shared.service';
import { DatePipe } from '@angular/common';
import { AppComponent } from '../app.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule , DatePipe , AppComponent , DatePipe , MatIconModule,FlexLayoutModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  datepipe: DatePipe;
  constructor(private SharedService: SharedService,private zone : NgZone) {
    this.datepipe = new DatePipe('en-IN');

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
  Diffrence:any;
  Time:any;
  
  emit(Event: any) {
    this.SharedService.emitValue([-1, this.emittedValue])
    this.emittedValue = !this.emittedValue;
  }

  editemiter(Index: any) {
    this.SharedService.emitValue([Index, true])
    this.emittedValue = false;
  }
  ngAfterViewInit() {
    this.SharedService.currentuser.subscribe()
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
    });
  }

  deleteData(index: number) {
    this.SharedService.DeleteData(index).subscribe((x: any) => { this.getData() });
  }

  StartTimer(DateDate:any) {
      var string = this.datepipe.transform(DateDate.CreatedOn, 'medium');
      var time;
      return setInterval(() => {
      var mydate:Date = new Date(`${string}`)
      var TomorrowsDate = new Date( `
      ${new Date().getFullYear()}-
      ${(new Date().getMonth() + 1)< 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)}-
      ${(new Date().getDay() + 1)< 10 ? '0' + (new Date().getDay() + 1) : (new Date().getDay() + 1)} 
      ${mydate.getHours()}:
      ${mydate.getMinutes()}:
      ${mydate.getSeconds()}`) 
      var Todaysdate: Date = new Date();
      this.Diffrence = TomorrowsDate.getTime() - Todaysdate.getTime();
      var days = Math.floor(this.Diffrence / (1000 * 60 * 60 * 24));
      var hours = Math.floor((this.Diffrence % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((this.Diffrence % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((this.Diffrence % (1000 * 60)) / 1000);
      console.log(`${hours} + ":" + ${minutes}  + ":" + ${seconds}`);
      return `hello`
    },1000)
  }
  








  // myColor(index: any) {
  //   this.taskDate = new Date(this.tasks[index].CreatedOn);
  //   let DiffrenceInHours = this.taskDate.getHours() - this.Todaysdate.getHours();
  //   let DiffrenceInDays = DiffrenceInHours / (86400000);
  //   if ((DiffrenceInDays < 1 || this.tasks[index].Repetable == 1) && DiffrenceInHours > 0) {
  //     return ['#a3ff82']
  //   }
  //   else {
  //     return ['#ff2929']
  //   }
  // }

  // updateTimer(index: any) {
  //   setInterval(() => {
  //     this.taskDate = new Date(this.tasks[index].CreatedOn);
  //     return this.datepipe.transform(new Date(this.taskDate.getTime() - this.Todaysdate.getTime()), 'HH:mm:ss') || new Date("00:00:00");
  //   }, 1000);
  // }


}

