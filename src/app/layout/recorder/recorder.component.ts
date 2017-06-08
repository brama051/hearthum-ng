import {Component, OnInit} from '@angular/core';

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

    constructor() {
        this.audio.src = 'https://www.freesound.org/data/previews/146/146765_1417288-lq.mp3';
    }

    ngOnInit() {
    }

    public cmdStartRecording() {
        this.recordingStarted = true;
    }

    public cmdStopRecording() {
        this.recordingFinished = true;
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
    }

    public cmdDiscardRecording() {
        // todo: remove recording from memory
        this.playingActive = false;
        this.recordingFinished = false;
        this.recordingStarted = false;
    }
}
