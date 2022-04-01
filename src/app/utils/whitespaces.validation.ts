import { AbstractControl } from "@angular/forms";

export class SpacesValidator {
    /**
     * 
     * @param control: Control to assign the validator
     * @returns Validator to validate double space in the start of the input
     */
    static doubleSpace(control: AbstractControl): { [key: string]: boolean } | null {
        const value = control.value;

        if (value.indexOf("  ") !== -1) {
            return { doubleSpace: true }
        }

        return null;
    }

    /**
     * 
     * @param control: Control to assign the validator
     * @returns Validator to validate space in the start of the input
     */
    static startSpace(control: AbstractControl): { [key: string]: boolean } | null {

        const value = control.value;

        const splited = value.split("");

        if (splited[0] === " " || undefined || null) {
            return { start: true }
        }

        return null;
    }

    /**
     * 
     * @param control: Control to assign the validator
     * @returns Validator to validate space in the end of the input
     */
    static lastSpace(control: AbstractControl): { [key: string]: boolean } | null {

        const value = control.value;

        const splited = value.split("");

        if(splited.at(-1) === " " || undefined || null ) {
            return { end: true }
        }

        return null;
    }

    /**
     * 
     * @param control: Control to assign the validator
     * @returns Validator betwen lastSpace and startSpace
     */
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

    /**
     * 
     * @param control: Control to assign the validator
     * @returns Validator to validate if contains spaces. (containSpace)
     */
    static containsSpace(control: AbstractControl): { [key: string]: boolean } | null {

        const value = control.value;

        const splited: String[] = value.split("");

        if(splited.includes(" ")) {
            return { containSpace: true }
        }

        return null;
    } 
}