import {Component, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Recording} from '../../../../shared/models/recording';
import {RepositoryService} from '../../../../shared/services/repository.service';
import {AnalysisDto} from "../../../../shared/common/dto/analysis-dto";

@Component({
  selector: 'app-analysis-modal',
  templateUrl: './analysis-modal.component.html',
  styleUrls: ['./analysis-modal.component.scss']
})
export class AnalysisModalComponent {

    closeResult: string;

    @ViewChild('childModal') public childModal: NgbModal

    private analysisList: AnalysisDto[] = [];

    private recording: Recording;

    constructor(private modalService: NgbModal, private repositoryService: RepositoryService) {
    }

    public open(r: Recording) {
        this.recording = r;
        this.repositoryService.getRecordingAnalysis(r.id).subscribe(d => {
            console.log(d);
            this.analysisList = d;
        });

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
}
