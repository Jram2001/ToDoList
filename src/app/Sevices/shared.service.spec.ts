import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SharedService } from './shared.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

describe('SharedService', () => {
  let service: SharedService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SharedService]
    });

    service = TestBed.inject(SharedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a value', () => {
    const event = { data: 'test' };
    service.emitValue(event);
    service.emittedValue.subscribe(value => {
      expect(value).toEqual(event);
    });
  });

  it('should trigger the method subject', () => {
    let triggered = false;
    service.triggerMethodSubject.subscribe(() => {
      triggered = true;
    });
    service.triggerMethod();
    expect(triggered).toBeTrue();
  });

  it('should send a GET request to delete data', () => {
    const index = 1;
    const url = `http://localhost:3000/delete/${index}`;
    service.DeleteData(index).subscribe();

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  // Add more test cases for other methods as needed

  it('should send a POST request to create data', () => {
    const Task_form = new FormGroup({
      TaskName: new FormControl('MyTask', Validators.required),
      AsigneName: new FormControl('Jayaram', Validators.required),
      Descriiption: new FormControl('He is a good guy', Validators.required),
      Repetable: new FormControl(true),
      CreatedOn: new FormControl('2022-02-14T18:20:50.000Z' , Validators.required),
      id: new FormControl(5),
      Label : new FormControl('none', Validators.required)
    });
    const url = 'http://localhost:3000/create';
    service.CreateData(Task_form.value , 'lol').subscribe();
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should get Data from Backend', () => {
    localStorage.setItem('UserID','1')
    const url = 'http://localhost:3000/todo';
    service.GetBackendData().subscribe();
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should generate table text from backend', () => {
    localStorage.setItem('UserID','1')
    const url = 'http://localhost:3000/generate-text';
    service.GenerateLabel('Read books daily').subscribe();
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should Edit the already available Backend Data', () => {
    localStorage.setItem('UserID','1')
    const url = 'http://localhost:3000/update';
    service.EditData('Read books daily','lol').subscribe();
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should Login', () => {
    const url = 'http://localhost:3000/validate';
    service.login('Read books daily').subscribe();
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should Create already available data', () => {
    const url = 'http://localhost:3000/CreateMyUser';
    service.CreateUser('Read books daily').subscribe();
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should verify token', () => {
    const url = 'http://localhost:3000/ValidateToken';
    service.VerifyToken('Read books daily').subscribe();
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should Create already available data', () => {
    const url = 'http://localhost:3000/ValidateToken';
    service.VerifyToken('Read books daily').subscribe();
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should call VerifyToken with the correct headers', () => {
    localStorage.setItem('Token','1234')
    const headers = new HttpHeaders({
      'Authorization': 'Bearer 1234'
    });
    spyOn(service, 'VerifyToken').and.callThrough()
    service.ValidateUser();
    expect(service.VerifyToken).toHaveBeenCalled();
  });

});