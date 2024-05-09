import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
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
});
