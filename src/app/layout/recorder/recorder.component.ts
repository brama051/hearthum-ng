import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SaveModalComponent} from './components/save-modal/save-modal.component';
declare const navigator: any;
declare const MediaRecorder: any;
import wavesurfer from 'wavesurfer.js';


@Component({
    selector: 'app-recorder',
    templateUrl: './recorder.component.html',
    styleUrls: ['./recorder.component.scss']
})
export class RecorderComponent implements OnInit {

    // -- player state
    public recordingStarted = false;
    public recordingFinished = false;
    public playingActive = false;
    // -- recorder objects
    private chunks: any = [];
    private mediaRecorder: any;
    // -- save recording dialog
    @ViewChild(SaveModalComponent) saveModal: SaveModalComponent;
    @ViewChild('zoom') eleZoomSelect: ElementRef;
    @ViewChild('speed') eleSpeedSelect: ElementRef;
    // -- visualizer
    private wavesurfer: any;
    // -- constructor
    private playbackSpeed = 1;
    private visualizerZoom = 100;
    constructor(private ref: ChangeDetectorRef) {
    }

    ngOnInit() {
        const onSuccess = stream => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.onstop = e => {
                const blob = new Blob(this.chunks, {'type': 'audio/wav;'});
                this.wavesurfer.loadBlob(blob);
                this.chunks = [];
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
        this.recordingStarted = true;
        this.wavesurfer = wavesurfer.create({
            container: '#waveform',
            waveColor: 'blue',
            progressColor: 'gray',
            height: window.screen.height - 135,
            normalize: true,
            scrollParent: true,
            minPxPerSec: 100,
        });
        this.wavesurfer.on('finish', this.onPlaybackFinish.bind(this));
        this.mediaRecorder.start();
    }

    private onPlaybackFinish() {
        this.playingActive = false;
        this.wavesurfer.stop();
        this.ref.markForCheck();
        this.ref.detectChanges();

    }

    public cmdStopRecording() {
        this.recordingFinished = true;
        this.mediaRecorder.stop();
    }

    public cmdPlayerPlay() {
        this.playingActive = true;
        // this.audio.play();
        this.wavesurfer.play();
    }

    public cmdPlayerPause() {
        this.playingActive = false;
        // this.audio.pause();
        this.wavesurfer.pause();
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
        this.wavesurfer.destroy();
        this.playbackSpeed = 1;
        this.visualizerZoom = 100;

    }

    public setZoom(factor) {
        this.visualizerZoom = factor;
        this.wavesurfer.zoom(factor);
    }

    public setPlaybackRate(factor) {
        this.playbackSpeed = factor;
        this.wavesurfer.setPlaybackRate(factor);
    }

}
