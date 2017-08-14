import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Recording} from '../../../../shared/models/recording';
import {AnalysisDto} from "../../../../shared/common/dto/analysis-dto";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {

    @Input() recording: Recording;
    @Output() diagnosticsEmitter = new EventEmitter<any>();
    public singlePositive: boolean;
    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(this.recording);
    }

    ngOnInit() {
        this.recording.analysisList.forEach((value: AnalysisDto) => {
            if (value.analysisOutcome) {
                this.singlePositive = true;
            }
        });
    }

    public emitRecordingClicked() {
        this.diagnosticsEmitter.emit(this.recording);
    }

}
