import { AbstractControl } from '@angular/forms';

export class LengthValidation {
  static minLengthArray(min: number) {
    return (c: AbstractControl): { [key: string]: any } | null => {
      if (c.value.length >= min) return null;

      return { minLengthArray: true };
    };
  }
}
