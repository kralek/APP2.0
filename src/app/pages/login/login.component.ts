import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  moduleId: module.id,
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private auth: AngularFireAuth, public route: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  form: FormGroup;
  isErrorVisible: boolean = false;
  errorMessage: string | null = null;

  ngOnInit() {

  }

  login() {
    const { email, password } = this.form.value;
    this.auth.signInWithEmailAndPassword(email, password)
      .then(userVerify => {
        this.isErrorVisible = false;
        this.route.navigate(['./user/dashboard'])
      }).catch(error => {
        if (error.code === "auth/wrong-password") {
          this.errorMessage = 'Podane hasło jest nieprawidłowe albo użytkownik nie podał hasła';
        } else {
          this.errorMessage = 'Bład serwera. Prosze spróbować poźniej';
        }
        this.isErrorVisible = true;
      });
  }
  logout() {
    this.auth.signOut();
  }

  onSubmit(event: any) {
    this.login();
  }
}
