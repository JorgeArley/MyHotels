import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { canActivateGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

describe('canActivateGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  const executeGuard: CanActivateFn = (...guardParameters) =>
  TestBed.runInInjectionContext(() => canActivateGuard(...guardParameters));

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['checkAuthentication']);
    router = jasmine.createSpyObj('Router', ['navigate']);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
