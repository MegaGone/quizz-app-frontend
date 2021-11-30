import { AbstractControl } from "@angular/forms";

export class SpacesValidator {
    static doubleSpace(control: AbstractControl): { [key: string]: boolean } | null {
        const value = control.value;

        if (value.indexOf("  ") !== -1) {
            return { doubleSpace: true }
        }

        return null;
    }

    static startSpace(control: AbstractControl): { [key: string]: boolean } | null {

        const value = control.value;

        const splited = value.split("");

        if (splited[0] === " " || undefined || null) {
            return { start: true }
        }

        return null;
    }

    static lastSpace(control: AbstractControl): { [key: string]: boolean } | null {

        const value = control.value;

        const splited = value.split("");

        if(splited.at(-1) === " " || undefined || null ) {
            return { end: true }
        }

        return null;
    }

    static spaces(control: AbstractControl): { [key: string]: boolean } | null {

        const value = control.value;

        const splited = value.split("");

        if (splited[0] === " " || undefined || null) {
            return { space: true }
        } 
        
        else if (splited.at(-1) === " " || undefined || null) {
            return { space: true }
        }

        return null;
    }
}