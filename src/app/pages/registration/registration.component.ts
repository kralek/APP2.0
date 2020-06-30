import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth/auth';

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  constructor() {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      passwordRepeat: new FormControl("", [Validators.required]),
    });
  }

  onSubmit = (event: any) => {
    event.preventDefault();
    console.log(this.form.value);
  }

  form: FormGroup;

  ngOnInit(): void {}
}
