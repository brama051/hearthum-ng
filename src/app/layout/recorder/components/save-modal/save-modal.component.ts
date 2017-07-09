import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-save-modal',
    templateUrl: './save-modal.component.html',
    styleUrls: ['./save-modal.component.scss'],
})
export class SaveModalComponent {

    closeResult: string;
    @ViewChild('childModal') public childModal: NgbModal;
    @Output() update = new EventEmitter<any>();

    // ------------------------------------------------------------------------
    private datetime: Date;
    // --- form attributes ----------------------------------------------------
    public patientName = '';
    public patientEmail = '';
    public recordingPosition = '';
    public recordingDateTime = '';
    public recordingDevice = '';

    constructor(private modalService: NgbModal) {
    }

    public open() {
        this.patientName = '';
        this.patientEmail = '';
        this.recordingPosition = '';
        this.recordingDateTime = '';
        this.recordingDevice = '';
        this.datetime = new Date();
        this.recordingDateTime = this.datetime.getFullYear() + '-' +
            ('0' + (this.datetime.getMonth() + 1)).slice(-2)
            + '-' + ('0' + this.datetime.getDate()).slice(-2)
            + 'T' + this.datetime.getHours() + ':' + this.datetime.getMinutes();

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
