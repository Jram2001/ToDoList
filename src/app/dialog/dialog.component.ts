import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedService } from '../Sevices/shared.service';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule,FormControl,FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatSlideToggleModule,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, margin: '0' }),
        animate('300ms ease-out', style({ opacity: 1, margin: '0 0 20px 0' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, margin: '0' }))
      ])
    ])
  ]})
export class DialogComponent {
  constructor(private SharedService:SharedService,private formbuilder:FormBuilder){ }
    ToDoList = new FormGroup({
    TaskName : new FormControl('',Validators.required),
    InputBox : new FormControl('',Validators.required),
    AsigneName : new FormControl('',Validators.required),
    Description : new FormControl('',Validators.required)
  })
  tagform! : FormGroup;
  tasks:any = [];
  ngOnInit(){
    this.tagform = this.formbuilder.group({
      published: true,
      credentials: this.formbuilder.array([]),
    });
    this.SharedService.GetBackendData().subscribe( data => this.tasks = data);
    this.addItem();
  }
  

  addItem(){
      const creds = this.tagform.get('credentials') as FormArray;
      creds.push(
        this.formbuilder.group({
          TagName : ['']
        })
      )
  }

}
