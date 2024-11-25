import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function MatchValidator(controlName: string, matchingControlName: string) : ValidatorFn{
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if(!control || !matchingControl){
      return null;
    }

    if(matchingControl?.errors && !matchingControl.errors['controlMismatch']){
      return null;
    }

    if(control.value !== matchingControl.value){
      matchingControl.setErrors({controlMismatch: true});
    }else{
      matchingControl.setErrors(null);
    }

    return null;
  }
}
