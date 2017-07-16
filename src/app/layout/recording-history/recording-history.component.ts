import {ApplicationRef, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RepositoryService} from '../../shared/services/repository.service';
import {PagedResponse} from '../../shared/common/paged-response';
import {RecordingDto} from '../../shared/common/dto/recording-dto';
import {RecordingPage} from '../../shared/common/recording-page';
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

    constructor(private changeDetector: ChangeDetectorRef, private repositoryService: RepositoryService) {

    }

    ngOnInit() {
        this.loadPage();
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    private loadPage() {
        this.repositoryService.getRecordingPage(this.page - 1, this.pageSize).subscribe((d) => {
            this.recordingPage = d; console.log(d);
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

    private handlePageChange() {
        this.loadPage();
    }

}
