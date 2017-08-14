import {RecordingDto} from '../common/dto/recording-dto';
export class Recording implements RecordingDto {
    id: number;
    patientName: string;
    patientEmail: string;
    patientSex: string;
    patientHeight: number;
    patientWeight: number;
    patientAge: number;
    recordingLength: number;
    recordingPosition: string;
    recordingDateTime: string;
    recordingDevice: string;
    comment: string;
    content: Blob;
    analysisList;

    constructor(content: Blob) {
        this.content = content;
    }

    setDefaultValues() {
        this.patientName = '';
        this.patientEmail = '';
        this.patientSex = '';
        this.patientHeight = 175;
        this.patientWeight = 75;
        this.patientAge = 18;
        this.recordingPosition = '';
        this.recordingDateTime = '';
        this.recordingDevice = '';
        const currentDatetime = new Date();
        this.recordingDateTime = currentDatetime.getFullYear() + '-' +
            ('0' + (currentDatetime.getMonth() + 1)).slice(-2)
            + '-' + ('0' + currentDatetime.getDate()).slice(-2)
            + 'T' + currentDatetime.getHours() + ':' + currentDatetime.getMinutes();
        this.comment = '';
    }
}
