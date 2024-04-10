import { ChangeDetectorRef, Component, EventEmitter, NgModule, Output, Pipe, inject } from '@angular/core';
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
import { trigger, transition, style, animate, state } from '@angular/animations';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSlideToggleModule,MatDatepickerModule,ReactiveFormsModule, MatFormFieldModule,CommonModule , DatePipe , AppComponent , DatePipe , MatIconModule,FlexLayoutModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('fadeIn', [
        transition(':enter', [
          style({"transform": "translateY(100px)",opacity: 0}),
          animate( '400ms {{numberOfDropdownItems}}ms ease-in-out', style({"transform": "translateY(0)",opacity: 1}), )
        ], {params: {numberOfDropdownItems: 1}}),
        transition(':leave', [
          style({"transform": "translateY(0)",opacity: 1}),
          animate( '400ms ease-in-out', style({"transform": "translateY(100)",opacity: 0}), )
        ], {params: {numberOfDropdownItems: 1}})
    ])
  ]
})
export class HomeComponent {
  datepipe: DatePipe;
  Diffrence: any;
  router: any;
  constructor(private SharedService: SharedService,private zone : NgZone,private formbuilder: FormBuilder , private cdr: ChangeDetectorRef) {
    this.datepipe = new DatePipe('en-IN');
    this.router = inject(Router)
  }
  FilterName = 'none';
  // To Store Data to be Displayed
  FilerDate:any;
  //To create a unique set to hold tag values
  UniqueTag: Set<any> = new Set();
  //used to store cusrrent day value
  ThisDay:any = ''+(new Date().toString()).split(' ')[2]
  //used to store present month data
  ThisMonth:any  = (new Date().getMonth() + 1)< 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1);
  //used to store present year data
  ThisYear:any = new Date().getFullYear();
  animationData: any = 'visible';
  // Used to store running timer in a array
  TimerData:String[] = ['00:00:00'];
  // To store running timer in a array
  UserName = localStorage.getItem('user');
  // To store emitting value responsible for triggering dialog compoent
  emittedValue: boolean = true;
  // To store task data
  tasks: any = [];
  // To indicate that data fetched from backend
  dataLoaded: boolean = false;
  //Used to indicate if the form is used to edit or create a task data
  Edit_Data = false;

  Task_form = new FormGroup({
    TaskName: new FormControl('', Validators.required),
    AsigneName: new FormControl('', Validators.required),
    Descriiption: new FormControl('', Validators.required),
    Repetable: new FormControl(true),
    CreatedOn: new FormControl((new Date().toISOString().replace('T', ' ').slice(0, -5))),
    id: new FormControl(this.tasks.length + 1),
    Label : new FormControl('none', Validators.required),
  });
  // To set already available data to edit 
  Edit_Task(Task:any){
    this.Edit_Data = true;
    this.Task_form.get('id')?.setValue(Task.id);
    this.Task_form.get('TaskName')?.setValue(Task.TaskName);
    this.Task_form.get('AsigneName')?.setValue(Task.AsigneeName);
    this.Task_form.get('Descriiption')?.setValue(Task.Descriiption);
    this.Task_form.get('Repetable')?.setValue(Task.Repetable);
    this.Task_form.get('CreatedOn')?.setValue((Task.CreatedOn).replace('T', ' ').slice(0, -5));
  }

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
    this.SharedService.currentuser.subscribe()
    this.SharedService.ValidateUser();
    this.getData();
  }

  getData() {
    this.SharedService.GetBackendData().subscribe((Data: any) => {
      this.TimerData.length = 0;
      this.tasks = Data;
      this.FilerDate = Data;
      this.AssignData(Data);
      this.dataLoaded = true;
    });
  }

  AssignData(Data:any){
    console.log(Data)
    for(let i = 0; i < Data.length; i++){
      this.UniqueTag.add(this.FilerDate[i].Label);
    }
  }

  deleteData(index: number) {
    this.SharedService.DeleteData(index).subscribe((x: any) => { this.router.navigate([this.router.url]) });
  }

  StartTimer(Task:any,Index:any) {
      //to convert date format
      setInterval(() => {
      var string = this.datepipe.transform(Task.CreatedOn, 'medium');
      //to converted the formated date into date variable
      var mydate:Date = new Date(`${string}`);
      //to find date which we compare to present
      var TomorrowsDate = new Date( `
      ${this.ThisYear}-
      ${this.ThisMonth}-
      ${this.ThisDay} 
      ${mydate.getHours()}:
      ${mydate.getMinutes()}:
      ${mydate.getSeconds()}`);
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
      // console.log(TomorrowsDate,Todaysdate,this.Diffrence,hours,minutes,seconds,Diffrence,DiffrenceInDays)
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

  Submit(Task_Data:any){
    if(Task_Data.valid){
    this.SharedService.GenerateLabel(Task_Data.value.Descriiption).subscribe((data:any) => {
      this.Task_form.get('Label')?.setValue(data.response);
      this.Edit_Data == false ? this.SharedService.CreateData(Task_Data.value,'mdslds').subscribe(() =>  {this.Edit_Data = false}) : this.SharedService.EditData(Task_Data.value,'mdslds').subscribe(() => {this.Edit_Data = false})
    })
  }else{
    console.log(Task_Data,Task_Data.valid,'lololol')
  }
  }

  LeaveDom(){
    this.animationData = 'hidden';
  }
  EnterDOM(){
    this.animationData = 'visible';
  }

  ApllayFilter(Label:any){
    this.FilterName = Label;
  }

  RemoveFilter(){
    this.FilterName = 'none';
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