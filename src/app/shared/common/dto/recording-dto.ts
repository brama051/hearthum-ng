export interface RecordingDto {
    id: number;
    patientName: string;
    patientEmail: string;
    recordingLength: number;
    recordingPosition: string;
    recordingDateTime: string;
    recordingDevice: string;
    content: Blob;
}
