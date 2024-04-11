import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return a user whit data ', () => {
    const expectResponse =     {
      "id": 1,
      "user": "Jorge Ospina",
      "email": "jorge@gmail.com"
    }
    service.login('jorge@gmail.com', '123456').subscribe((res) => {
      expect(res).toEqual(expectResponse)
    });
    const req = httpMock.expectOne('http://localhost:3000/users/1');
    req.flush(expectResponse);
  });

});
