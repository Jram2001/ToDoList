import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedService } from '../Sevices/shared.service';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';

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
  constructor(private SharedService: SharedService, private formbuilder: FormBuilder) {
    this.tagform = this.formbuilder.group({
      published: true,
      credentials: this.formbuilder.array([]),
    });
  }
  tagform!: FormGroup;
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
  })

  ngOnInit() {    
    this.SharedService.triggerMethodSubject.subscribe((x:any) => {
      console.log(typeof(x) == 'number',typeof(x))
      if(typeof(x) == 'number'){
      this.SetValue(x);
      }
    });
    this.SharedService.GetBackendData().subscribe(data => { this.tasks = data; this.ToDoList.get('id')?.setValue(this.tasks.length + 1) });
    this.addItem();
  }

  addItem() {
    const creds = this.tagform.get('credentials') as FormArray;
    creds.push(
      this.formbuilder.group({
        Tag: ['']
      })
    )
  }
  SetValue(index:any){
      this.ToDoList.get('id')?.setValue(this.tasks[index].id);
      this.ToDoList.get('TaskName')?.setValue(this.tasks[index].TaskName);
      this.ToDoList.get('InputBox')?.setValue(this.tasks[index].InputBox);
      this.ToDoList.get('AsigneName')?.setValue(this.tasks[index].AsigneeName);
      this.ToDoList.get('Description')?.setValue(this.tasks[index].Descriptions);
      this.ToDoList.get('Repetable')?.setValue(this.tasks[index].Repetable);
      this.ToDoList.get('CreatedOn')?.setValue(this.tasks[index].CreatedOn);
    console.log('form',this.ToDoList.value,this.tasks[index])
    }
  Submit(a: any, b: any) {
    console.log(this.ToDoList.get('Repetable'))
    this.SharedService.CreateData(a.value, b.value.credentials).subscribe(x => {console.log('h');this.SharedService.triggerMethod()});
  }

}
