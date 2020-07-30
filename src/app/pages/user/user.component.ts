import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    constructor(public auth: AngularFireAuth){}
    ngOnInit(){
        this.auth.currentUser.then(user => console.log(user));
    }
}
