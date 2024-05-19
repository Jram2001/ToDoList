  import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
  import { HttpClientTestingModule } from '@angular/common/http/testing';
  import { HomeComponent } from './home.component';
  import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { SharedService } from '../Sevices/shared.service';
  import { HttpClient } from '@angular/common/http';
  import { of } from 'rxjs';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import { CommonModule, DatePipe } from '@angular/common';
  import { Router } from '@angular/router';

  class MockSharedService {
    static ValidateUser: any;
    CreateData(a: any, b: any) {
      return of('user created')
    }
    EditData(value:FormData){
      return of({"response": "Sleep"})
    }
    GenerateLabel(Description:String){
      return of({"response": "Sleep"})
    }
    DeleteData(index:any){
      return of(`Data deleted at index ${index}`)
    }
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
    let mochservice: MockSharedService;
    let datePipeSpy: jasmine.SpyObj<DatePipe>;
    let paypalConfig;
    beforeEach( waitForAsync( () => {
      payPalConfig = {
      currency: "EUR",
      clientId: "ARcAOpeYbhdhnezJD53uQhs3A9P-ccw60B6bLXTMjVguHmzmZJOH2aipbeiA695MLuTvtjZ2QjzInp-1",
      createOrder: jasmine.createSpy("createOrder").and.callFake((data) => {
        return {
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "EUR",
                value: "9.99",
                breakdown: {
                  item_total: {
                    currency_code: "EUR",
                    value: "9.99"
                  }
                }
              },
              items: [
                {
                  name: "Enterprise Subscription",
                  quantity: "1",
                  category: "DIGITAL_GOODS",
                  unit_amount: {
                    currency_code: "EUR",
                    value: "9.99"
                  }
                }
              ]
            }
          ]
        };
      }),
      advanced: {
        commit: "true"
      },
      style: {
        label: "paypal",
        layout: "vertical"
      },
      onApprove: jasmine.createSpy("onApprove"),
      onClientAuthorization: jasmine.createSpy("onClientAuthorization"),
      onCancel: jasmine.createSpy("onCancel"),
      onError: jasmine.createSpy("onError"),
      onClick: jasmine.createSpy("onClick")
      };
      const datePipeSpyObj = jasmine.createSpyObj('DatePipe', ['transform']);
      const HttpSpy = jasmine.createSpyObj('HttpClient',['post'])
      mochservice = new MockSharedService();
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule,ReactiveFormsModule,BrowserAnimationsModule],
        providers : [   
          { provide: SharedService,useValue: mochservice },
          { provide : HttpClient , useValue : HttpSpy },
          { provide: DatePipe, useValue: datePipeSpyObj }
        ]
      }).compileComponents();
     datePipeSpy = TestBed.inject(DatePipe) as jasmine.SpyObj<DatePipe>;
    }));
    beforeEach( () =>{
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
    })

    it('should create', () => {
      expect(component).toBeTruthy();
      fixture.detectChanges();  
    });

    it("should have correct currency and client ID", () => {
      expect(payPalConfig.currency).toEqual("EUR");
      expect(payPalConfig.clientId).toEqual("ARcAOpeYbhdhnezJD53uQhs3A9P-ccw60B6bLXTMjVguHmzmZJOH2aipbeiA695MLuTvtjZ2QjzInp-1");
    });

    it("should create order with correct values", () => {
      const data = {}; 
      const order = payPalConfig.createOrder(data);
      expect(order.intent).toEqual("CAPTURE");
      expect(order.purchase_units[0].amount.value).toEqual("9.99");
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


    it('Retrive data from backend failed' , () =>{
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

    it(' It should initialise the Edit form value ' , () =>{
      const BackEndData = {
          id: 1,
          TaskName: 'Sleep',
          AsigneeName: 'Jayaram',
          Descriiption: '8hoursofsleep',
          Repetable: '1',
          CreatedOn: '2022-02-14T18:20:50.000Z',
          Deleted: 0,
          UserID: 26,
          Label: 'misc'
      };
      component.tasks = [0,0,0,0]
      component.Task_form = new FormGroup({
      TaskName: new FormControl('MyTask', Validators.required),
      AsigneName: new FormControl('Jayaram', Validators.required),
      Descriiption: new FormControl('He is a good guy', Validators.required),
      Repetable: new FormControl(true),
      CreatedOn: new FormControl('2022-02-14T18:20:50.000Z' , Validators.required),
      id: new FormControl(component.tasks.length + 1),
      Label : new FormControl('none', Validators.required)
      });
      component.Edit_Task(BackEndData);
      expect(component.animationData).toEqual('visible');
      expect(component.Edit_Data).toEqual(true);
      expect(component.Task_form.get('TaskName')?.value).toEqual('Sleep');
      expect(component.Task_form.get('AsigneName')?.value).toEqual('Jayaram');
      expect(component.Task_form.get('Descriiption')?.value).toEqual('8hoursofsleep');
      expect(component.Task_form.get('CreatedOn')?.value).toEqual('2022-02-14 18:20:50');
      expect(component.Task_form.get('id')?.value).toEqual(1);
      expect(component.Task_form.get('Label')?.value).toEqual('none');
    })

  it('should create data if Edit_Data is false', fakeAsync(() => {
    component.Task_form = new FormGroup({
      TaskName: new FormControl('MyTask', Validators.required),
      AsigneName: new FormControl('Jayaram', Validators.required),
      Descriiption: new FormControl('He is a good guy', Validators.required),
      Repetable: new FormControl(true),
      CreatedOn: new FormControl('2022-02-14T18:20:50.000Z', Validators.required),
      id: new FormControl(5),
      Label: new FormControl('none', Validators.required)
    });

    const spyGenerateLabel = spyOn(mochservice, 'GenerateLabel').and.callThrough();
    const spyCreateData = spyOn(mochservice, 'CreateData').and.callThrough();

    component.Submit(component.Task_form);
    tick();
    expect(component.Task_form.valid).toBeTrue();
    expect(spyGenerateLabel).toHaveBeenCalled();
    expect(spyGenerateLabel).toHaveBeenCalledWith('He is a good guy');
    expect(component.Task_form.get('Label')?.value).toEqual('Sleep');
    expect(spyCreateData).toHaveBeenCalled();
  }));

  it('should Edit data if Edit_Data is false', fakeAsync(() => {
    component.Task_form = new FormGroup({
      TaskName: new FormControl('MyTask', Validators.required),
      AsigneName: new FormControl('Jayaram', Validators.required),
      Descriiption: new FormControl('He is a good guy', Validators.required),
      Repetable: new FormControl(true),
      CreatedOn: new FormControl('2022-02-14T18:20:50.000Z', Validators.required),
      id: new FormControl(5),
      Label: new FormControl('none', Validators.required)
    });
    component.Edit_Data = true;
    const spyEditData = spyOn(mochservice, 'EditData').and.callThrough();
    const spyCreateData = spyOn(mochservice, 'CreateData').and.callThrough();
    const spyGenerateLabel = spyOn(mochservice, 'GenerateLabel').and.callThrough();
    component.Submit(component.Task_form);
    tick();
    expect(spyEditData).toHaveBeenCalled();
    expect(component.Task_form.valid).toBeTrue();
    expect(spyGenerateLabel).toHaveBeenCalled();
    expect(component.Edit_Data).toBeFalse();
    expect(spyCreateData).toHaveBeenCalledTimes(0);
  }));

  it('should Edit data if Edit_Data is false', fakeAsync(() => {
    component.Task_form = new FormGroup({
      TaskName: new FormControl('MyTask', Validators.required),
      AsigneName: new FormControl('Jayaram', Validators.required),
      Descriiption: new FormControl('He is a good guy', Validators.required),
      Repetable: new FormControl(true),
      CreatedOn: new FormControl('2022-02-14T18:20:50.000Z', Validators.required),
      id: new FormControl(5),
      Label: new FormControl('', Validators.required)
    });
    component.Edit_Data = true;
    const spyEditData = spyOn(mochservice, 'EditData').and.callThrough();
    const spyCreateData = spyOn(mochservice, 'CreateData').and.callThrough();
    const spyGenerateLabel = spyOn(mochservice, 'GenerateLabel').and.callThrough();
    component.Submit(component.Task_form);
    tick();
    expect(component.Task_form.valid).toBeFalse();
    expect(spyEditData).toHaveBeenCalledTimes(0);
    expect(spyGenerateLabel).toHaveBeenCalledTimes(0);
    expect(spyCreateData).toHaveBeenCalledTimes(0);
  }));

  it('should set animationData as hidden', fakeAsync(() => {
    component.LeaveDom()
    expect(component.animationData).toEqual('hidden')
  }))

  it('should set animationData as hidden', fakeAsync(() => {
    component.EnterDOM()
    expect(component.animationData).toEqual('visible')
  }))

  it('should applay filter', fakeAsync(() => {
  component.ApllayFilter('Read');
  expect(component.FilterName).toEqual('Read');
  }))

  it('should Clear all filter', fakeAsync(() => {
      component.RemoveFilter();
      expect(component.FilterName).toEqual('none');
  }))

  it('should Make payment bt,m visible or hidden', fakeAsync(() => {
      component.isPaymentButtonVisible = false;
      component.MakePaymentButtonVisible();
      expect(component.isPaymentButtonVisible).toBeTrue();
  }))

   it('should display the timer correctly for a valid task', () => {
    const mockTask = { CreatedOn: new Date(), Repetable: 1 };
    const mockIndex = 0;
    // Mock datepipe transform
    datePipeSpy.transform.and.returnValue(new Date().toString());
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date());
    component.StartTimer(mockTask, mockIndex);
    jasmine.clock().tick(1001);
    console.log(component.TimerData,': Timer')

    expect(component.TimerData[mockIndex]).not.toBe('EXPIRED');
    jasmine.clock().uninstall();
  });

  it('should label expired for an expired task', () => {
    const mockTask = { CreatedOn: new Date(new Date().getTime() - 3600 * 1000), Repetable: 0 };
    const mockIndex = 0;
    // Mock datepipe transform
    datePipeSpy.transform.and.returnValue(new Date(new Date().getTime() - 3600 * 1000).toString());
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date());
    component.StartTimer(mockTask, mockIndex);
    jasmine.clock().tick(1001);
    expect(component.TimerData[mockIndex]).toBe('EXPIRED');
    jasmine.clock().uninstall();
  });

  it('should call DeleteData and navigate to the current URL', () => {
    const spyDateDate = spyOn(mochservice, 'DeleteData').and.callThrough();
    // Arrange
    const routerspy = spyOn(TestBed.inject(Router) , 'navigate')
    const router = TestBed.inject(Router);
    const index = 1;
    // Act
    component.deleteData(index);
    // Assert
    expect(spyDateDate).toHaveBeenCalledWith(index);
    expect(routerspy).toHaveBeenCalledWith(['/']);
  });

  it('should call DeleteData and navigate to the current URL', () => {
    const SpyValidateUser = spyOn(mochservice, 'ValidateUser').and.callThrough();
    const routerspy = spyOn(TestBed.inject(Router) , 'navigate')
    component.ngOnInit();
    expect()
    expect(SpyValidateUser).toHaveBeenCalled();
    expect(routerspy).toHaveBeenCalledTimes(0);
  });

  it('should call DeleteData and navigate to the current URL', () => {
    const SpyValidateUser = spyOn(mochservice, 'ValidateUser').and.returnValue(of(false));
    const routerspy = spyOn(TestBed.inject(Router) , 'navigate')
    component.ngOnInit();
    expect()
    expect(SpyValidateUser).toHaveBeenCalled();
    expect(routerspy).toHaveBeenCalled();
  });
  });


   let payPalConfig: { currency: any; clientId: any; createOrder: any; advanced?: { commit: string; }; style?: { label: string; layout: string; }; onApprove?: jasmine.Spy<jasmine.Func>; onClientAuthorization?: jasmine.Spy<jasmine.Func>; onCancel?: jasmine.Spy<jasmine.Func>; onError?: jasmine.Spy<jasmine.Func>; onClick?: jasmine.Spy<jasmine.Func>; };
