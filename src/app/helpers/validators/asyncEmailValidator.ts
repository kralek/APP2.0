import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth/auth';

export function checkEmail(auth: AngularFireAuth, control: AbstractControl): Promise<ValidationErrors | null>  { // here we have the 'passwords' groupW
  let email = control.value;

  return auth.fetchSignInMethodsForEmail(email).then((signInMethods) => {
    if (signInMethods.length > 0) {
      return Promise.resolve({ emailExistInBase: true })   
    }
    return Promise.resolve(null) ;
  })   
}
