import {Component, OnInit, ViewChild} from '@angular/core';
import {SaveModalComponent} from './components/save-modal/save-modal.component';
declare const navigator: any;
declare const MediaRecorder: any;

@Component({
    selector: 'app-recorder',
    templateUrl: './recorder.component.html',
    styleUrls: ['./recorder.component.scss']
})
export class RecorderComponent implements OnInit {
    public audio = new Audio();
    public recordingStarted = false;
    public recordingFinished = false;
    public playingActive = false;
    // --
    private chunks: any = [];
    private mediaRecorder: any;
    // --
    @ViewChild(SaveModalComponent) saveModal: SaveModalComponent;
    // --
    // private wavesurfer: WaveSurfer;
    constructor() {
    }

    ngOnInit() {
        const onSuccess = stream => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.onstop = e => {
                const blob = new Blob(this.chunks, {'type': 'audio/wav;'});
                this.chunks = [];
                this.audio.src = window.URL.createObjectURL(blob);
                this.audio.load();
            };

            this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data);
        };

        navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

        navigator.getUserMedia({audio: true}, onSuccess, e => console.log(e));
    }

    public cmdStartRecording() {
        this.audio = new Audio();
        this.audio.onended = er => {
            this.playingActive = false;
        };
        this.recordingStarted = true;
        this.mediaRecorder.start();
    }

    public cmdStopRecording() {
        this.recordingFinished = true;
        this.mediaRecorder.stop();
    }

    public cmdPlayerPlay() {
        this.playingActive = true;
        this.audio.play();
    }

    public cmdPlayerPause() {
        this.playingActive = false;
        this.audio.pause();
    }

    public cmdSaveRecording() {
        // todo: call popup with form
        this.playingActive = false;
        this.recordingFinished = false;
        this.recordingStarted = false;
        this.saveModal.open();
    }

    public cmdDiscardRecording() {
        // todo: remove recording from memory
        this.playingActive = false;
        this.recordingFinished = false;
        this.recordingStarted = false;
    }
}
