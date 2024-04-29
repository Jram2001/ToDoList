import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';

import { SharedService } from './shared.service';

describe('SharedService', () => {
  let service: SharedService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    })
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
