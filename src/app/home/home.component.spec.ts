import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../Sevices/shared.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach( () => {
    const HttpSpy = jasmine.createSpyObj('HttpClient',['post'])
    TestBed.configureTestingModule({
      imports: [HomeComponent,HttpClientTestingModule,ReactiveFormsModule],
      providers : [   
        {
          provide: SharedService,
          useValue: { // Mock SharedService if needed
            login(userData: any) {
              return of({
                accessToken: '...',
                user: '...',
                userId: 1
              });
            },
            ValidateUser(){
              return of(true)
            },
            GetBackendData(){
            return of(
              [
                {
                    "id": 1,
                    "TaskName": "Sleep",
                    "AsigneeName": "Jayaram",
                    "Descriiption": "8hoursofsleep",
                    "Repetable": "1",
                    "CreatedOn": "2022-02-14T18:20:50.000Z",
                    "Deleted": 0,
                    "UserID": 26,
                    "Label": "misc"
                }
              ]
            )
            }
          }
        },
        {provide : HttpClient , useValue : HttpSpy}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.dataLoaded = true;
    expect(component).toBeTruthy();
  });
});
