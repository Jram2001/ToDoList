import { Component, EventEmitter, Output, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../Sevices/shared.service';
import { DatePipe } from '@angular/common';
import { AppComponent } from '../app.component';
import { pipe } from 'rxjs';

@Pipe({
  name: 'DatePipe'
})
export class datePipe {
  transform(value: string): string {
    return value.toUpperCase();
  }
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,DatePipe,AppComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  emittedValue:boolean = false 
  constructor(private SharedService:SharedService , private DatePipe:DatePipe ){}
  tasks:any = [];
  Todaysdate = new Date();
  taskDate! :Date;
  TickerValue:any;
  ngOnInit(){
    this.SharedService.TaskDta.subscribe( data => {this.tasks = data;})
  }
  emit(Event:any){
    this.SharedService.emitValue(Event)
  }
  myColor(index:any){
    this.taskDate = new Date(this.tasks[index].CreatedOn);
    let DiffrenceInHours =  this.taskDate.getHours() - this.Todaysdate.getHours();
    let DiffrenceInDays = DiffrenceInHours /  (86400000);
    this.TickerValue = this.DatePipe.transform(new Date(this.taskDate.getTime() - this.Todaysdate.getTime()), 'HH:mm:ss') || new Date("00:00:00");
    console.log(this.TickerValue)
    if((DiffrenceInDays < 1 || this.tasks[index].Repetable == 1) && DiffrenceInHours > 0 ){
        return '#a3ff82'
    }
    else{
      return '#ff2929'
    }
  }
}

