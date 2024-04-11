import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { User } from '../../interfaces/user';

const userInformation =     {
  "id": 1,
  "user": "Jorge Ospina",
  "email": "jorge@gmail.com"
}

const mockAuthService: {
  login: () => Observable<User | undefined>
} = {
  login: () => of(userInformation)
}

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let router: Router;


  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,

      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sshould call onlogin()', () => {
    spyOn(router, 'navigate');
    const getHotelsSpy = spyOn(mockAuthService, 'login');
    getHotelsSpy.and.returnValue(of(userInformation));

    component.onLogin();
    expect(mockAuthService.login).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
