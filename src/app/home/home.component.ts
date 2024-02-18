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
  ngOnInit(){
    this.SharedService.TaskDta.subscribe( data => {this.tasks = data})
   
  }
  emit(Event:any){
    this.SharedService.emitValue(Event)
  }
}

