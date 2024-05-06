import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin.component';
import { SharedService } from '../Sevices/shared.service';
import { of, throwError } from 'rxjs';


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
        {provide : SharedService , useValue: {
            login(userData: any) {
              return of({
                accessToken: 'eyJhbGciOiJIUzI1NiJ9.amF5YXJhbQ.wblL-lMAAk4skSqJcnYJPX2eLCvA6mNH7MeZUozbbOk',
                user: 'jayaram',
                userId: 1
              });
            }
        }}, // Provide the SharedService or mock it as needed
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }

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

  it('should Throw an error' , ()=> {  
    const httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    const errorResponse = new HttpErrorResponse({
      error: 'API Failed',
      status: 500, 
      statusText: 'Internal Server Error'
    });
    httpClientSpy.post.and.returnValue(of(<HttpErrorResponse>(errorResponse)))
    component.UserData = new FormGroup({
      UserName: new FormControl('dmklsdsdmsl', Validators.required),
      password: new FormControl('sbndsdb@12', Validators.required)
    });
    const consoleSpy = spyOn(console,'error');
    component.Login();
    expect(localStorage.getItem('UserID')).toEqual('1');
  })

  it ('should set value in local storage', () =>{
    const UserData = new FormGroup({
      UserName: new FormControl('jayaram', Validators.required),
      password: new FormControl('jayaram@123', Validators.required)
    })
    const sharedService = SharedService;
    component.UserData = new FormGroup({
      UserName: new FormControl('jayaram', Validators.required),
      password: new FormControl('jayaram@123', Validators.required)
    })
      const httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
      httpClientSpy.post.and.returnValue(of({
      "accessToken": "eyJhbGciOiJIUzI1NiJ9.amF5YXJhbQ.wblL-lMAAk4skSqJcnYJPX2eLCvA6mNH7MeZUozbbOk",
      "user": "jayaram",
      "userId": 1
    }));
    const consoleSpy = spyOn(console,'error')
    // const mockReturnValue = {
    //   "accessToken": "eyJhbGciOiJIUzI1NiJ9.amF5YXJhbQ.wblL-lMAAk4skSqJcnYJPX2eLCvA6mNH7MeZUozbbOk",
    //   "user": "jayaram",
    //   "userId": 1
    // }
    // httpClientSpy.post.and.returnValue(of(mockReturnValue));
    const router = TestBed.inject(Router);
    component.Login();
    expect(UserData.valid).toBeTrue();
    expect(localStorage.getItem('Token')).toEqual('eyJhbGciOiJIUzI1NiJ9.amF5YXJhbQ.wblL-lMAAk4skSqJcnYJPX2eLCvA6mNH7MeZUozbbOk');
    expect(localStorage.getItem('user')).toEqual('jayaram');
    expect(localStorage.getItem('UserID')).toEqual('1');
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
    expect(consoleSpy).not.toHaveBeenCalled();
  })

  it ('Throw an error when UserData is null', () => {
    component.UserData = new FormGroup({
      UserName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
      const consoleSpy = spyOn(console,'error');
      component.Login();
      expect(component.UserData.valid).toBeFalse()
      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(' Enter valid details ');
  })



});

describe('SigninComponentLoginFailed', () => {
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
        {provide : SharedService , useValue: {
          login(userData: any) {
            return throwError(() => new Error('Username or password is incorrect'));
          }
        }}, // Provide the SharedService or mock it as needed
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }

      ]
    }).compileComponents(); // Compile template and CSS
    }));

     beforeEach(() => {
       fixture = TestBed.createComponent(SigninComponent);
       component = fixture.componentInstance;
       fixture.detectChanges();
     });

    it ('Throw an error when UserData is null', () => {
      component.UserData = new FormGroup({
        UserName: new FormControl('jayaam', Validators.required),
        password: new FormControl('jayaram@123', Validators.required)
      });
        const consoleSpy = spyOn(console,'error');
        component.Login();
        expect(consoleSpy).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith(new Error('Username or password is incorrect'));
    })
})

  // describe('SigninComponentCreateUSerFailed', () => {
  //   let component: SigninComponent;
  //   let fixture: ComponentFixture<SigninComponent>;
  //   let httpClientSpy: jasmine.SpyObj<HttpClient>;
  //   beforeEach(waitForAsync(() => {
  //     const spy = jasmine.createSpyObj('HttpClient',['post'])
  //     TestBed.configureTestingModule({
  //       imports: [
  //         CommonModule,
  //         RouterModule.forRoot([]),
  //         ReactiveFormsModule,
  //         HttpClientModule
  //       ],
  //       providers: [
  //         { provide: HttpClient, useValue: spy },
  //         {provide : SharedService , useValue: {
  //             CreateUser(userData: any) {
  //                 return throwError(() => new Error('Username or password is not valid'));
  //             }
  //         }}, // Provide the SharedService or mock it as needed
  //         { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }

  //       ]
  //     }).compileComponents(); // Compile template and CSS
  //     }));

  //      beforeEach(() => {
  //        fixture = TestBed.createComponent(SigninComponent);
  //        component = fixture.componentInstance;
  //        fixture.detectChanges();
  //      });

  //     it ('Throw an error when UserData is null', () => {
  //       component.UserData = new FormGroup({
  //         UserName: new FormControl('', Validators.required),
  //         password: new FormControl('', Validators.required)
  //       });
  //         const consoleSpy = spyOn(console,'error');
  //         component.Login();
  //         expect(component.UserData.valid).toBeFalse()
  //         expect(consoleSpy).toHaveBeenCalled();
  //         expect(consoleSpy).toHaveBeenCalledWith(' Enter valid details ');
  //     })

  // })


