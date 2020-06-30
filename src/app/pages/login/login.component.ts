import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'login',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(public auth: AngularFireAuth) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  form: FormGroup;

  ngOnInit(){

  }

  login() {
    // this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }

  onSubmit(form: any){
    console.log(form);
  }
}
