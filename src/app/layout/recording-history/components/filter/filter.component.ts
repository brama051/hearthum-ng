import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {RecordingFilter} from '../../../../shared/models/recording-filter';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
    public isCollapsed = true;
    public recordingFilter: RecordingFilter;
    @Output() change: EventEmitter<RecordingFilter> = new EventEmitter<RecordingFilter>();

    constructor() {
        this.recordingFilter = new RecordingFilter('', false, 'patientName', 'descending');
    }

    ngOnInit() {
    }

    apply() {
        this.change.emit(this.recordingFilter);
        this.isCollapsed = true;
    }

}
