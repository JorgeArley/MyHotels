import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutPageComponent } from './layout-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';

const mockAuthService: {
  logout: () => void
} = {
  logout: () => {}
}

describe('LayoutPageComponent', () => {

  let component: LayoutPageComponent;
  let fixture: ComponentFixture<LayoutPageComponent>;
  let router: Router;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [LayoutPageComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sshould call logOut()', () => {
    spyOn(router, 'navigate');
    const getHotelsSpy = spyOn(mockAuthService, 'logout');
    getHotelsSpy.and.returnValue();

    component.onLogout();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

});
