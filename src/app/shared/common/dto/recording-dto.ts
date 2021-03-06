export interface RecordingDto {
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
}
