import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { checkPasswords } from 'app/helpers/validators/passwordValidator';
import { checkEmail } from 'app/helpers/validators/asyncEmailValidator';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore, public route: Router) {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email], [checkEmail.bind(this, this.auth)]),
      passwordGroup: new FormGroup({
        password: new FormControl("", [Validators.required, Validators.minLength(6)]),
        passwordRepeat: new FormControl("", [Validators.required, Validators.minLength(6)])
      },[checkPasswords])
    });
  }

  form: FormGroup;
  isErrorVisible: boolean = false;
  errorMessage: string | null = null;

  onSubmit = (event: any) => {
    event.preventDefault();

    if(this.form.valid){
      const {email, name, passwordGroup: {password}} = this.form.value;
      this.auth.createUserWithEmailAndPassword(email, password).then(user => {
        this.firestore.collection('users').add({
          uid: user.user.uid,
          name,
          children: []
        })
        this.isErrorVisible = false;
        this.route.navigate(['./user/user'])
      }).catch(error => {
        if (error.code === "auth/argument-error") {
          this.errorMessage = 'Podane hasło nie jest wystarczajaco silne! Podaj inne hasło!';
        } else {
          this.errorMessage = 'Bład serwera. Prosze spróbować poźniej';
        }
        this.isErrorVisible = true;
      })
    }
  }

  ngOnInit(): void {}
}
