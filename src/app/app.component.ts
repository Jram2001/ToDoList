import { Component, NgModule, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { SharedService } from './Sevices/shared.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent,CommonModule,DialogComponent,ReactiveFormsModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
    animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ transform: 'translate(-50%, 100%)',left: '50%',top: '50%' }),
        animate('500ms ease-out', style({ transform: 'translate(-50%, -50%)',left: '50%',top: '50%' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translate(-50%, 200%)',left: '50%',top: '50%' }))
      ])
    ])
  ]
})

export class AppComponent {
  constructor(private SharedService:SharedService){}
  title = 'ToDoList';
  Visibility:boolean = true
  localdata:any ;

  ngOnInit(){    
    this.SharedService.emittedValue.subscribe(inpu => this.Visibility = !this.Visibility)
    this.SharedService.GetBackendData();
  }

} 
