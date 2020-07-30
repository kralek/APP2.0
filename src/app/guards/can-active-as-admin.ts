import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class CanActivateAsAdmin implements CanActivate {
  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this.auth.currentUser.then(currentUser => {
        return this.firestore.collection('users').get().toPromise().then(collection => collection.docs.find(user => 
            user.data().uid === currentUser.uid
        ).data().type === 'admin');
    }).catch(error => false);
  }
}