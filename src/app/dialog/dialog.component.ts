import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedService } from '../Sevices/shared.service';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { setTimeout } from 'timers/promises';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatSlideToggleModule, MatIconModule, ReactiveFormsModule, FormsModule, CommonModule],
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
  ]
})
export class DialogComponent {
  constructor(private SharedService: SharedService, private formbuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    this.tagform = this.formbuilder.group({
      published: true,
      credentials: this.formbuilder.array([]),
    });
  }
  tagform!: FormGroup;
  valueStatus: boolean = false;
  tasks: any = [];
  taskId!: number;
  ToDoList = new FormGroup({
    TaskName: new FormControl('', Validators.required),
    InputBox: new FormControl('', Validators.required),
    AsigneName: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    Repetable: new FormControl(true),
    CreatedOn: new FormControl((new Date().toISOString().replace('T', ' ').slice(0, -5))),
    id: new FormControl(this.tasks.length + 1)
  });
  index!: number;
  isNewData: boolean = false;
  ngAfterViewInit() {
    this.SharedService.GetBackendData().subscribe(data => { this.tasks = data; this.ToDoList.get('id')?.setValue(this.tasks.length + 1) });
  }
  ngOnInit() {
    this.SharedService.triggerMethodSubject.subscribe((x: any) => {
      this.tagform = this.formbuilder.group({
        published: true,
        credentials: this.formbuilder.array([]),
      });
      this.valueStatus = true;
      if (x > -1) {
        this.SetValue(x);
      }
      else {
        this.addItem();
      }
    });
  }

  addItem() {
    let creds: any = [];
    creds = this.tagform.get('credentials') as FormArray;
    creds.push(
      this.formbuilder.group({
        Tag: ['']
      }))
    console.log(creds)
    this.isNewData = true;
  }

  SetValue(index: any) {
    console.log('olo')
    this.index = index;
    let creds: any = [];
    this.ToDoList.get('id')?.setValue(this.tasks[index].id);
    this.ToDoList.get('TaskName')?.setValue(this.tasks[index].TaskName);
    this.ToDoList.get('InputBox')?.setValue(this.tasks[index].InputBox);
    this.ToDoList.get('AsigneName')?.setValue(this.tasks[index].AsigneeName);
    this.ToDoList.get('Description')?.setValue(this.tasks[index].Descriptions);
    this.ToDoList.get('Repetable')?.setValue(this.tasks[index].Repetable);
    this.ToDoList.get('CreatedOn')?.setValue((this.tasks[index].CreatedOn).replace('T', ' ').slice(0, -5));
    this.isNewData = false;
    this.tagform = this.formbuilder.group({
      published: true,
      credentials: this.formbuilder.array([]),
    });

    creds = this.tagform.get('credentials') as FormArray;
    if(this.tasks[index].Tags){
    this.tasks[index].Tags.split(',').map((data: any) => {
      creds.push(
        this.formbuilder.group({
          Tag: [`${data}`]
        }))
    })
  }
  }
  Submit(a: any, b: any) {
    console.log(this.tasks,this.tagform,b)
    this.isNewData == true ? this.SharedService.CreateData(a, b).subscribe(() =>  this.SharedService.triggerMethod()) : this.SharedService.EditData(a, b, this.tasks[this.index].TagIds.split(',')).subscribe(() => this.SharedService.triggerMethod())
  }
}
