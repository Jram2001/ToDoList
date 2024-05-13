import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedService } from '../Sevices/shared.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockSharedService {
  
  login(userData: any) {
    return of({ accessToken: '...', user: '...', userId: 1 });
  }

  ValidateUser() {
    return of(true);
  }

  GetBackendData() {
    return of([
      {
        id: 1,
        TaskName: 'Sleep',
        AsigneeName: 'Jayaram',
        Descriiption: '8hoursofsleep',
        Repetable: '1',
        CreatedOn: '2022-02-14T18:20:50.000Z',
        Deleted: 0,
        UserID: 26,
        Label: 'misc'
      }
    ]);
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach( waitForAsync( () => {
    const HttpSpy = jasmine.createSpyObj('HttpClient',['post'])
    const mochservice = new MockSharedService();
    AssignData: jasmine.createSpy('AssignData')
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ReactiveFormsModule,BrowserAnimationsModule],
      providers : [   
        { provide: SharedService,useValue: mochservice },
        { provide : HttpClient , useValue : HttpSpy }
      ]
    }).compileComponents();
  }));
  beforeEach( () =>{
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();  
  });

  it('should set retrived values from backend ' , () =>{
    const ExpectValue = [{
        id: 1,
        TaskName: 'Sleep',
        AsigneeName: 'Jayaram',
        Descriiption: '8hoursofsleep',
        Repetable: '1',
        CreatedOn: '2022-02-14T18:20:50.000Z',
        Deleted: 0,
        UserID: 26,
        Label: 'misc'
    }];
    spyOn(component,'AssignData')
    component.getData();
    expect(component.tasks).toEqual(ExpectValue);
    expect(component.FilerDate).toEqual(ExpectValue);
    expect(component.dataLoaded).toEqual(true);
    expect(component.AssignData).toHaveBeenCalledWith(ExpectValue);
  })

  it(' It should Edit the value ' , () =>{
    component.tasks = [0,0,0,0]
    component.Task_form = new FormGroup({
    TaskName: new FormControl('MyTask', Validators.required),
    AsigneName: new FormControl('Jayaram', Validators.required),
    Descriiption: new FormControl('He is a good guy', Validators.required),
    Repetable: new FormControl(true),
    CreatedOn: new FormControl('2022-02-14T18:20:50.000Z' , Validators.required),
    id: new FormControl(component.tasks.length + 1),
    Label : new FormControl('none', Validators.required),
    });
    component.Edit_Task(component.Task_form);
    expect(component.animationData).toEqual('visible');
    expect(component.Edit_Data).toEqual(true);
    expect(component.Task_form.get('TaskName')?.value).toEqual('MyTask');
    expect(component.Task_form.get('AsigneName')?.value).toEqual('Jayaram');
    expect(component.Task_form.get('Descriiption')?.value).toEqual('He is a good guy');
    expect(component.Task_form.get('CreatedOn')?.value).toEqual('2022-02-14T18:20:50.000Z');
    expect(component.Task_form.get('id')?.value).toEqual(5);
    expect(component.Task_form.get('Label')?.value).toEqual('none');

    





  })
});
