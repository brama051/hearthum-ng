import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Recording} from "../../../../shared/models/recording";


@Component({
    selector: 'app-save-modal',
    templateUrl: './save-modal.component.html',
    styleUrls: ['./save-modal.component.scss'],
})
export class SaveModalComponent {

    closeResult: string;
    @ViewChild('childModal') public childModal: NgbModal;
    @Output() update = new EventEmitter<any>();
    // --- form attributes ----------------------------------------------------
    public recording: Recording = new Recording(new Blob());

    constructor(private modalService: NgbModal) {
    }

    public open() {
        this.recording.setDefaultValues();

        this.modalService.open(this.childModal).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    private close(action: string) {
        console.log(action);
        if (action === 'save') {
            this.update.emit({
                action: action
            });
        }
    }

}
