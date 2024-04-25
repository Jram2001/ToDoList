import { Component, NgModule, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CommonModule, DatePipe } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { SharedService } from './Sevices/shared.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { SigninComponent } from './signin/signin.component';

declare var Razorpay:any;

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
  //   razorPayOptions = {
  //   "key":"",
  //   "amount": "",
  //   "currency": "INR",
  //   "name":"",
  //   "description": "Skartz Payment",
  //   "order_id": "",
  //   "handler": (res: any) => {
  //     console.log(res);
  //   }
  // }
  submitted!: boolean;
  loading!: boolean;
  razorPayData: any;
  dataService: any;
  razor!: (res: any) => void;
  razorPayResponseHandler!: (res: any) => void;

  constructor(private SharedService: SharedService) { }
  title = 'ToDoList';
  Visibility: boolean = true;
  localdata: any;
  animationData: any = 'hidden';

  // buyRazorPay (formData: any) {
  //   this.submitted = true;
  //   this. loading = true;
  //   this.razorPayData = formData
  //   this.dataService.razorPayOrder(this.razorPayData).subscribe ((res) {
  //   this.razorPayOptions.key = res ['key'];
  //   this.razorPayOptions.amount = res['value'] ['amount'];
  //   this.razorPayOptions.name = this. razorPayData['name'];
  //   this.razorPayOptions.order_id = res ['value'] ['id'];
  //   this.razorPayOptions.handler = this.razorPayResponseHandler;
  //   var rzp1 = new Razorpay (this.razorPayOptions);
  //   rzp1.open();
  //   console.log('opened');
  //   })
  // }

  ngAfterViewInit() {
    this.SharedService.emittedValue.subscribe(inpu => { this.Visibility = inpu[1]; this.animationData = this.Visibility == true ? 'visible' : 'hidden' })
    this.SharedService.GetBackendData();
  }

} 
