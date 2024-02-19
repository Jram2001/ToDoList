import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../Sevices/shared.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  emittedValue:boolean = false 
  constructor(private SharedService:SharedService){}
  tasks:any = [];
  Todaysdate = new Date();
  taskDate! :Date;
  ngOnInit(){
    this.SharedService.TaskDta.subscribe( data => {this.tasks = data;})
  }
  emit(Event:any){
    this.SharedService.emitValue(Event)
  }
  myColor(){
    this.taskDate = new Date(this.tasks[0].CreatedOn);
    let DiffrenceInMilliseconds = this.Todaysdate.getTime() - this.taskDate.getTime();
    let DiffrenceInDays = this.Todaysdate.getDate() - this.taskDate.getDate();
    if(DiffrenceInDays < 1 || this.tasks[0].Repetable != 0){
        if(DiffrenceInMilliseconds / (1000 * 60 * 60 ) < 24){
        return '#3ffc72'
        }
        else{
          return '#ff2929'
        }
    }
    else{
      console.log(Math.floor(DiffrenceInMilliseconds / (1000 * 60 * 60 * 24)),DiffrenceInMilliseconds / (1000 * 60 * 60 ) < 24)
      return '#ff2929'
    }
  }
}

