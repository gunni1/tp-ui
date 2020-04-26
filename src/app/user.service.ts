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

  getCurrentUserJwt(): Promise<string> {
    return new Promise((resolve) => {
      Auth.currentSession()
        .then((session) => resolve(session.getAccessToken().getJwtToken())).catch(() => {
        resolve(null)
      });
    });
  }

  async getCurrentUserJwtAsync(): String {
    let session = await Auth.currentSession()
    return session.getAccessToken().getJwtToken()
  }

  getUsername(): string {

    return ""
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
