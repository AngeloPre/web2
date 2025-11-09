// auth.guard.ts
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Role, UserRole } from '../../store/user-role/user-role.store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService, LS_Token } from '@/app/services/login.service';

export const authGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);
  const login = inject(LoginService);
  const requiredRole = next.data['role'] as Role;
  const token = localStorage.getItem(LS_Token);

  const currentRole = login.currentRole();

  if (!token || jwtHelper.isTokenExpired(token)) {
    return router.parseUrl('/login');
  }

  if (!currentRole) {
    return router.parseUrl('/login');
  }

  if (requiredRole && currentRole.id !== requiredRole.id) {
    console.log(`User has ${currentRole.name}, required ${requiredRole.name}`);
    return router.parseUrl('/error');
  }

  return true;
};
