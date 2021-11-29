import { AbstractControl } from "@angular/forms";

export class SpacesValidator {
    static doubleSpace(control: AbstractControl): { [key: string]: boolean } | null {
        const value = control.value;

        if (value.indexOf("  ") !== -1) {
            return { doubleSpace: true }
        }

        return null;
    }
}