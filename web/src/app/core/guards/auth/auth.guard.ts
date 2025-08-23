// auth.guard.ts
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export const authGuard: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    //por enquanto apenas autoriza qualquer request (mudar quando tivermos auth token implementado)
    return true;
};