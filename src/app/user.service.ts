import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import {resolve} from "q";
import {AmplifyService} from "aws-amplify-angular";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private signedIn: boolean;
  private currentUser: any = null;

  constructor(
    private amplifyService: AmplifyService,
    private router: Router) {
    this.amplifyService.authStateChange$
      .subscribe(authState => {
        this.signedIn = authState.state === 'signedIn';
        if (!authState.user) {
          this.currentUser = null;
        } else {
          this.currentUser = authState.user;
          this.router.navigateByUrl("/user-home")
        }
      });
  }

  /**
   * Return current Users username
   */
  getCurrentUserUsername(): Promise<string> {
    return new Promise((resolve) => {
      Auth.currentAuthenticatedUser({bypassCache: false})
        .then((user) => {
          if ( user) {
            resolve(user.getUsername());
          }
        }).catch(() => {
        resolve(null)
      });
    });

  }

  logout() {
    this.currentUser = null;
    return Auth.signOut()
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      Auth.currentAuthenticatedUser({bypassCache: false})
        .then((user) => {
          if ( user) {
            resolve(true);
          }
        }).catch(() => {
            resolve(false)
      });
    });
  }

}
