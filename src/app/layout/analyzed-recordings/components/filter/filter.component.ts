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
    private filterStartDatetime: string;
    private filterEndDatetime: string;

    constructor() {
        this.resetFilters();
    }

    resetFilters() {
        this.recordingFilter = new RecordingFilter('', true, 'patientName', 'descending');

        const helperDate: Date = new Date();
        console.log(helperDate.toUTCString());
        this.filterEndDatetime = helperDate.toISOString().slice(0, 16);
        helperDate.setUTCHours(0, 0, 0, 0);
        this.filterStartDatetime = helperDate.toISOString().slice(0, 16);
    }

    ngOnInit() {
    }

    apply() {
        console.log('changed');
        if (this.recordingFilter.filterBy === 'dateCreated') {
            this.recordingFilter.filter = this.filterStartDatetime + '~' + this.filterEndDatetime;
        }
        this.change.emit(this.recordingFilter);
        this.isCollapsed = true;
    }

}
