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
    public content: RecordingDto[];

    constructor(private changeDetector: ChangeDetectorRef, private repositoryService: RepositoryService) {

    }

    ngOnInit() {
        this.repositoryService.getRecordingPage(0, 25).subscribe((d) => { this.recordingPage = d; console.log(d); });
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    private handlePostData(pagedResponse: PagedResponse<RecordingDto>) {
        // console.log(pagedResponse);
        this.recordingPage = pagedResponse;
        // ApplicationRef.tick()

        // this.content = pagedResponse.content;
        /*console.log(this.content);
        console.log(this.recordingPage);*/
        this.changeDetector.detectChanges();
    }

    private handlePostError(e) {
        console.log('--- error ---');
        console.log(e);
    }

    private handlePostComplete() {
        console.log('--- complete ---');
    }

}
