import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import {resolve} from "q";
import {AmplifyService} from "aws-amplify-angular";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private signedIn: boolean;
  private currentUser: any = null;

  constructor(private amplifyService: AmplifyService) {
    this.amplifyService.authStateChange$
      .subscribe(authState => {
        this.signedIn = authState.state === 'signedIn';
        if (!authState.user) {
          this.currentUser = null;
        } else {
          this.currentUser = authState.user;
        }
      });
  }

  /**
   * Return current Users username
   */
  getUsername() {
    if(this.signedIn) {
      return this.currentUser.username
    }
    else {
      return "";
    }
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
