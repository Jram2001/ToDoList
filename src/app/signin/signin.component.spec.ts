import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin.component';
import { SharedService } from '../Sevices/shared.service';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('HttpClient',['post'])
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        { provide: HttpClient, useValue: spy },
        SharedService // Provide the SharedService or mock it as needed
      ]
    }).compileComponents(); // Compile template and CSS
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should set value in local storage', () =>{
    component.UserData = new FormGroup({
      UserName: new FormControl('jayaram', Validators.required),
      password: new FormControl('jayaram@123', Validators.required)
    })
    const mockReturnValue = {
      "accessToken": "eyJhbGciOiJIUzI1NiJ9.amF5YXJhbQ.wblL-lMAAk4skSqJcnYJPX2eLCvA6mNH7MeZUozbbOk",
      "user": "jayaram",
      "userId": 1
    }
    // httpClientSpy.post.and.returnValue(of(mockReturnValue));
    const ShareService = TestBed.inject(SharedService); 
    const router = TestBed.inject(Router);
    component.Login()
    expect(component.Login()).toHaveBeenCalledWith(component.UserData.value);
  })

  // Add more test cases as needed
});
function mockLogin() {
  return of({
      "accessToken": "eyJhbGciOiJIUzI1NiJ9.amF5YXJhbQ.wblL-lMAAk4skSqJcnYJPX2eLCvA6mNH7MeZUozbbOk",
      "user": "jayaram",
      "userId": 1
    })
}

