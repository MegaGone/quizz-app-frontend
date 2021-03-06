import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class ValidationMessageService {
    constructor(private toastSvc: ToastrService) { }

    /**
     *
     * @param text : String   - Message to show in the alert
     * @param title: String   - Title of the message
     * @param flag : Boolean  - Indicate if the message will be of success or error
     * @returns An alert with your text.
     */
    showMessage(text: string, title: string, flag: boolean) {

        if (flag) {
            return this.toastSvc.success(text, title, {
                progressBar: true,
                timeOut: 1250
            })
        }

        return this.toastSvc.error(text, title, {
            progressBar: true,
            timeOut: 1250
        })

    }

    /**
     * 
     * @param text 
     * @param title 
     * @returns An alert indicating the text copied.
     */
    showCopyToClipboard(text: string, title: string) {

        return this.toastSvc.info(text, title, {
            timeOut: 400
        })

    }
}
