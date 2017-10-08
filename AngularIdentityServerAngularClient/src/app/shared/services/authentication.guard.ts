import { Injectable } from "@angular/core";
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from "./authentication.service";

/*
 * Checks if the user is authenticated & authorized before routing to the component.
 * Saves loading time.
 */
@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    /*
     * If not authorized, redirect to identity server.
     */
    let isLoggedIn = this.authenticationService.isLoggedInObs();

    isLoggedIn.subscribe((loggedin) => {
      console.debug('AuthorizationCheck', `Authenticated ${loggedin}`);
      if (!loggedin) {
        this.authenticationService.startSigninMainWindow();
      }
    });

    return isLoggedIn;
  }
}/**
 * Created by mvsle on 5-10-2017.
 */
