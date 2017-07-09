import {RecordingDto} from '../common/dto/recording-dto';
export class Recording implements RecordingDto {
    id: number;
    patientName: string;
    patientEmail: string;
    recordingLength: number;
    recordingPosition: string;
    recordingDateTime: string;
    recordingDevice: string;
    content: Blob;

    constructor(content: Blob) {
        this.content = content;
    }
}
