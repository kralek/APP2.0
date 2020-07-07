import { FormGroup } from '@angular/forms';

export function checkPasswords(group: FormGroup) { // here we have the 'passwords' group
console.log(group);
  let pass = group.get('password').value;
  let confirmPass = group.get('passwordRepeat').value;

  return pass === confirmPass ? null : { notSame: true }     
}