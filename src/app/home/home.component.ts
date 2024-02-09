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
  tasks:any = [1,2,3,4];
  emit(Event:any){
    console.log('hello')
    this.SharedService.emitValue(Event)
  }
}

