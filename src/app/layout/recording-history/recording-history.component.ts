import {ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {RepositoryService} from '../../shared/services/repository.service';
import {PagedResponse} from '../../shared/common/paged-response';
import {RecordingDto} from '../../shared/common/dto/recording-dto';
import {FilterComponent} from './components/filter/filter.component';
import {AnalysisModalComponent} from './components/analysis-modal/analysis-modal.component';
import {Recording} from '../../shared/models/recording';

@Component({
    selector: 'app-recording-history',
    templateUrl: './recording-history.component.html',
    styleUrls: ['./recording-history.component.scss'],
})
export class RecordingHistoryComponent implements OnInit, OnChanges {

    public recordingPage: PagedResponse<RecordingDto>;
    public pageSize = 10;
    public page = 1;

    @ViewChild(FilterComponent) filterComponent: FilterComponent;
    @ViewChild(AnalysisModalComponent) analysisModal: AnalysisModalComponent;

    constructor(private changeDetector: ChangeDetectorRef, private repositoryService: RepositoryService) {
    }

    ngOnInit() {
        this.loadPage();
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    private loadPage() {
        console.log(this.filterComponent.recordingFilter);
        this.repositoryService.getRecordingPage(this.page - 1, this.pageSize, this.filterComponent.recordingFilter).subscribe((d) => {
            this.recordingPage = d;
            console.log(d);
            this.pageSize = this.recordingPage.size;
            this.page = this.recordingPage.number + 1;
        });
    }

    public handlePostError(e) {
        console.log('--- error ---');
        console.log(e);
    }

    private handlePostComplete() {
        console.log('--- complete ---');
    }

    public handlePageChange() {
        this.loadPage();
    }

    public handleFilterChange() {
        console.log('--- filter changed ---');
        this.resetPageSettings();
        this.loadPage();
    }

    private resetPageSettings() {
        this.pageSize = 10;
        this.page = 1;
    }

    public cardEventHandler(recording: Recording) {
        this.analysisModal.open(recording);
        console.log(recording);
    }

 }
