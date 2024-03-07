import { Component, NgModule, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CommonModule, DatePipe } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { SharedService } from './Sevices/shared.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { SigninComponent } from './signin/signin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SigninComponent,RouterOutlet, HomeComponent, CommonModule, DialogComponent, ReactiveFormsModule, FormsModule, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fadeIn', [
      state('hidden', style({
        transform: 'translate(-50%, 200%)', left: '50%', top: '50%'
      })),
      state('visible', style({
        transform: 'translate(-50%, -50%)', left: '50%', top: '50%'
      })),
      transition('hidden <=> visible', [
        animate('500ms ease-in')
      ])
    ])
  ]
})

export class AppComponent {
  constructor(private SharedService: SharedService) { }
  title = 'ToDoList';
  Visibility: boolean = false;
  localdata: any;
  animationData: any = 'hidden';

  ngAfterViewInit() {
    this.SharedService.emittedValue.subscribe(inpu => { this.Visibility = inpu[1]; this.animationData = this.Visibility == true ? 'visible' : 'hidden' })
    this.SharedService.GetBackendData();
  }

} 
