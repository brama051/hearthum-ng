import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from '../models/user';
import {Recording} from '../models/recording';
import {PagedResponse} from '../common/paged-response';
import {RecordingDto} from '../common/dto/recording-dto';
import {RecordingResponse} from '../common/recording-response';

@Injectable()
export class RepositoryService {
    // private repositoryURL = 'http://localhost:8080/hearthum';
     private repositoryURL = 'https://hearthum-backend.herokuapp.com/hearthum';

    constructor(private http: Http) {
    }

    // --- user methods -------------------------------------------------------
    public getUser(): Observable<any> {
        return this.http
            .get(`${this.repositoryURL}/users`)
            .map((response: Response) => response.json());
    }

    public postUser(user: User): Observable<any> {
        return this.http
            .post(`${this.repositoryURL}/recordings`, user, this._getJsonHeadersOptions())
            .map((response: Response) => response.json());
    }

    // --- recording methods --------------------------------------------------
    public getRecording(id: string): Observable<RecordingResponse> {
        return this.http
            .get(`${this.repositoryURL}/recordings/${id}`)
            .map((response: Response) => response.json() as RecordingResponse);
    }

    public getRecordingPage(page: number, size: number): Observable<PagedResponse<RecordingDto>> {
        return this.http
            .get(`${this.repositoryURL}/recordings?page=${page}&size=${size}`)
            .map((response: Response) => response.json() as PagedResponse<RecordingDto>);
    }

    public postRecording(recording: Recording): Observable<any> {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json; multipart/form-data;');
        const options = new RequestOptions({
            headers: headers
        });
        console.log(recording);
        const formData = new FormData();
        formData.append('content', new File([recording.content], 'recording.wav' ));
        formData.append('patientName', recording.patientName);
        formData.append('patientEmail', recording.patientEmail);
        formData.append('patientAge', recording.patientAge);
        formData.append('patientSex', recording.patientSex);
        formData.append('patientHeight', recording.patientHeight);
        formData.append('patientWeight', recording.patientWeight);
        formData.append('recordingDevice', recording.recordingDevice);
        formData.append('recordingPosition', recording.recordingPosition);
        formData.append('recordingDateTime', recording.recordingDateTime);
        formData.append('recordingLength', recording.recordingLength);
        formData.append('comment', recording.comment);

        console.log(recording);

        return this.http
            .post(`${this.repositoryURL}/recordings`,  formData)
            .map((response: Response) => response.json());
    }

    // --- helper methods -----------------------------------------------------

    private _getJsonHeadersOptions(): RequestOptions {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Cache-Control', 'no-cache');
        headers.append('Cache-Control', 'no-store');

        return new RequestOptions({
            headers: headers
        });
    }

    private blobToBase64(blob, cb) {
        const reader = new FileReader();
        reader.onload = function() {
            const dataUrl = reader.result;
            const base64 = dataUrl.split(',')[1];
            cb(base64);
        };
        reader.readAsDataURL(blob);
    };

}
