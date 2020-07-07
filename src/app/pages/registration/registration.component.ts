import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { checkPasswords } from 'app/helpers/validators/passwordValidator';

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  constructor(public auth: AngularFireAuth) {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      passwordGroup: new FormGroup({
        password: new FormControl("", [Validators.required, Validators.minLength(6)]),
        passwordRepeat: new FormControl("", [Validators.required, Validators.minLength(6)])
      },[checkPasswords])
    });
  }

  form: FormGroup;

  onSubmit = (event: any) => {
    //console.log(this.form.get('passwordGroup'));
    event.preventDefault();
    const {email, password} = this.form.value;
    this.auth.createUserWithEmailAndPassword(email, password);
  }

  ngOnInit(): void {}
}
