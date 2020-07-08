import { FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';

export function checkPasswords(control: AbstractControl):ValidationErrors { // here we have the 'passwords' group
  let pass = control.get('password').value;
  let confirmPass = control.get('passwordRepeat').value;

  return pass === confirmPass ? null : { notSame: true }     
}
