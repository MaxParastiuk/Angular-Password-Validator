import { Component } from '@angular/core';
import {
  FormControl,
  FormControlStatus,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  EASY_PASSWORD,
  MEDIUM_PASSWORD,
  STRONG_PASSWORD,
} from 'src/app/constants/patterns';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css'],
})
export class PasswordInputComponent {
  passwordInput: FormControl;

  constructor() {
    this.passwordInput = new FormControl('', [
      Validators.required,
      this.passwordValidator,
    ]);
    console.log(this.passwordInput.status);
  }

  passwordValidator(control: FormControl): ValidationErrors | null {
    const hasValue = control.value;
    const isLengthValid = hasValue ? hasValue.length > 7 : false;
    if (!hasValue) {
      return { hasNotValue: true };
    } else if (!isLengthValid) {
      return { isNotLengthValid: true };
    }
    return null;
  }

  get currentError(): string[][] | null {
    if (this.passwordInput.errors) {
      return [...[this.passwordInput.errors]].map((el) => {
        return Object.keys(el!).filter((el) => el !== 'required');
      });
    } else return null;
  }

  get currentStatus(): FormControlStatus {
    return this.passwordInput.status;
  }

  get sizeValidation(): any {
    if (EASY_PASSWORD.test(this.passwordInput.value)) {
      return 'easy';
    } else if (MEDIUM_PASSWORD.test(this.passwordInput.value)) {
      return 'medium';
    } else if (STRONG_PASSWORD.test(this.passwordInput.value)) {
      return 'strong';
    }
  }
}
