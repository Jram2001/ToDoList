import { Component, EventEmitter, NgModule, Output, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../Sevices/shared.service';
import { DatePipe } from '@angular/common';
import { AppComponent } from '../app.component';
import { interval, pipe } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DatePipe, AppComponent, DatePipe, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  datepipe: DatePipe;
  constructor(private SharedService: SharedService) {
    this.datepipe = new DatePipe('en-US');
  }
  emittedValue: boolean = false
  tasks: any = [];
  Todaysdate = new Date();
  taskDate!: Date;
  TickerValue: any;
  Color: any;
  TimerArray: any = [];
  TagData: any = [];
  Arrayoftagdata: any = [];
  index: number = 0;

  ngOnInit() {
    this.SharedService.TaskDta.subscribe(data => this.tasks = data);
    this.SharedService.TagData.subscribe(data => this.TagData = data);
  }
  emit(Event: any) {
    this.SharedService.emitValue(Event)
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

  deleteData(index: number) {
    this.SharedService.DeleteData(index)
  }

  ReturnTagValue() {
    this.index++;
    if (this.index <= this.tasks.length) {
      let temp = this.TagData.filter((x: any) => x.TaskId == this.index);
      this.Arrayoftagdata.push(temp);
      return temp;
    }
    else return 0
  }

  ngOnDestroy() {
    this.SharedService.TaskDta.unsubscribe();
  }

}

