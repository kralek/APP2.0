import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  form: FormGroup;

  ngOnInit(){

  }

  login() {
     const {email, password} = this.form.value;
     this.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    this.auth.signOut();
  }

  onSubmit(event: any){
    this.login(); 
  }
}
