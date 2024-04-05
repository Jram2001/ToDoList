import { Component, EventEmitter, NgModule, Output, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../Sevices/shared.service';
import { DatePipe } from '@angular/common';
import { AppComponent } from '../app.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSlideToggleModule,MatDatepickerModule,ReactiveFormsModule, MatFormFieldModule,CommonModule , DatePipe , AppComponent , DatePipe , MatIconModule,FlexLayoutModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  datepipe: DatePipe;
  Diffrence: any;
  constructor(private SharedService: SharedService,private zone : NgZone,private formbuilder: FormBuilder) {
    this.datepipe = new DatePipe('en-IN');
  }

  // Used to store running timer in a array
  TimerData:String[] = ['00:00:00'];
  // To store running timer in a array
  UserName = localStorage.getItem('user');
  // To store emitting value responsible for triggering dialog compoent
  emittedValue: boolean = true;
  // To store task data
  tasks: any = [];
  // TO indicate that data fetched from backend
  dataLoaded: boolean = false;
  
  Task_form = new FormGroup({
    TaskName: new FormControl('', Validators.required),
    AsigneName: new FormControl('', Validators.required),
    Descriiption: new FormControl('', Validators.required),
    Repetable: new FormControl(true),
    CreatedOn: new FormControl((new Date().toISOString().replace('T', ' ').slice(0, -5))),
    id: new FormControl(this.tasks.length + 1)
  });

  //Function used to trigger dialog compoent
  emit(Event: any) {
    // To emit value and trigger dialog compoent which used to create or delete a task
    this.SharedService.emitValue([-1, this.emittedValue])
    // Since using same button for opening and closing the dialog compoent initialise with oppposit value after triggering dialog component
    this.emittedValue = !this.emittedValue;
  }

  // Function used to trigger dialog compoent to edit a task 
  editemiter(Index: any) {
    // To emit value and open dialog compoent with index value for editting purpose 
    this.SharedService.emitValue([Index, true])
    // To close dialog compoent
    this.emittedValue = false;
  }

  ngAfterViewInit() {
    //
    this.SharedService.currentuser.subscribe()
    this.SharedService.ValidateUser();
    this.getData();
  }

  getData() {
    this.SharedService.GetBackendData().subscribe((Data: any) => {
      this.tasks = Data;
      for(let i = 0; i < Data.length; i++){
        this.TimerData.push("00:00:00");
      }
      this.dataLoaded = true;
    });
  }

  deleteData(index: number) {
    this.SharedService.DeleteData(index).subscribe((x: any) => { this.getData() });
  }

  StartTimer(Task:any,Index:any) {
    //to convert date format
      var string = this.datepipe.transform(Task.CreatedOn, 'medium');
      setInterval(() => {
      //to converted the formated date into date variable
      var mydate:Date = new Date(`${string}`);
      //to find date which we compare to present 
      var TomorrowsDate = new Date( `
      ${new Date().getFullYear()}-
      ${(new Date().getMonth() + 1)< 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)}-
      ${(new Date().getDay() + 1)< 10 ? '0' + (new Date().getDay() + 1) : (new Date().getDay() + 1)} 
      ${mydate.getHours()}:
      ${mydate.getMinutes()}:
      ${mydate.getSeconds()}`) 
      //to initalise present time
      var Todaysdate: Date = new Date();
      //to find diffrence between present and task time
      this.Diffrence = TomorrowsDate.getTime() - Todaysdate.getTime();
      //to find  diffrence in hours to display in front end
      var hours = Math.floor((this.Diffrence % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      //to find diffrence in minutes to display in front end
      var minutes = Math.floor((this.Diffrence % (1000 * 60 * 60)) / (1000 * 60));
      //to find diffrence in seconds to display in front end
      var seconds = Math.floor((this.Diffrence % (1000 * 60)) / 1000);
      // to find DiffrenceInHours to find if task is expired 
      let Diffrence = new Date(Task.CreatedOn).getHours() - Todaysdate.getHours();
      // to find DiffrenceInDays to find if the task is expired 
      let DiffrenceInDays = Diffrence / (86400000);
      // Finding if the task is expred 
      if ((DiffrenceInDays < 1 || this.tasks[Index].Repetable == 1) && Diffrence >= 0) {
      // Setting display data in frontend
      this.TimerData[Index] = `${hours} : ${minutes} : ${seconds}`;
      }else{
      // Labling expired in frontend
      this.TimerData[Index] = `EXPIRED`;
      }
      },1000)
  }
}

  // myColor(index: any) {
  //   this.taskDate = new Date(this.tasks[2].CreatedOn);
  //   let DiffrenceInHours = this.taskDate.getHours() - this.Todaysdate.getHours();
  //   let DiffrenceInDays = DiffrenceInHours / (86400000);
  //   if ((DiffrenceInDays < 1 || this.tasks[2].Repetable == 1) && DiffrenceInHours > 0) {
  //     console.log('pass')
  //   }
  //   else {
  //     console.log('fail')
  //   }
  // }

  // updateTimer(index: any) {
  //   setInterval(() => {
  //     this.taskDate = new Date(this.tasks[index].CreatedOn);
  //     return this.datepipe.transform(new Date(this.taskDate.getTime() - this.Todaysdate.getTime()), 'HH:mm:ss') || new Date("00:00:00");
  //   }, 1000);
  // }