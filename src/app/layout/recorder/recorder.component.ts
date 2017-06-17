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

    // -- player state --------------------------------------------------------
    public recordingStarted = false;
    public recordingFinished = false;
    public playingActive = false;
    // -- recorder objects ----------------------------------------------------
    private chunks: any = [];
    private mediaRecorder: any;
    private recordingLength = 0;
    // -- save recording dialog -----------------------------------------------
    @ViewChild(SaveModalComponent) saveModal: SaveModalComponent;
    // -- visualizer ----------------------------------------------------------
    private wavesurfer: any;
    // -- wavesurfer dynamic parameters
    private playbackSpeed = 1;
    private visualizerZoom = 100;
    // -- recording as a file
    private recordingFile: Blob;
    // -- constructor ---------------------------------------------------------
    constructor(private ref: ChangeDetectorRef) {
    }
    // -- methods -------------------------------------------------------------
    ngOnInit() {
        const onSuccess = stream => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.onstop = e => {
                const blob = new Blob(this.chunks, {'type': 'audio/wav;'});
                this.wavesurfer.loadBlob(blob);
                this.recordingFile = blob;
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

    // save blob as file
    private saveBlob(fileName) {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = window.URL.createObjectURL(this.recordingFile);
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(a.href);
    }

    // play button click method
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
        this.wavesurfer.on('ready', this.onWavesurferReady.bind(this));
        this.mediaRecorder.start();
    }

    // wavesurfer playback finished event
    private onPlaybackFinish() {
        this.playingActive = false;
        this.wavesurfer.stop();
        this.ref.markForCheck();
        this.ref.detectChanges();
    }

    // wavesurfer ready event
    private onWavesurferReady() {
        this.recordingLength = this.wavesurfer.getDuration();
        this.ref.markForCheck();
        this.ref.detectChanges();
    }

    // finish recording click method
    public cmdStopRecording() {
        this.mediaRecorder.stop();
        this.recordingFinished = true;
    }

    // wavesurfer play call method
    public cmdPlayerPlay() {
        this.playingActive = true;
        this.wavesurfer.play();
    }

    // wavesurfer pause method
    public cmdPlayerPause() {
        this.playingActive = false;
        this.wavesurfer.pause();
    }

    // save recording dialog method
    public cmdSaveRecording() {
        // todo: call popup with form
        // console.log(this.wavesurfer.exportPCM());
        // radi: console.log(this.wavesurfer.backend.mergedPeaks);
        this.saveBlob('file.wav');

        this.saveModal.open();
        this.playingActive = false;
        this.recordingFinished = false;
        this.recordingStarted = false;
        this.wavesurfer.destroy();
        this.playbackSpeed = 1;
        this.visualizerZoom = 100;

    }

    // discard recording dialog method
    public cmdDiscardRecording() {
        // todo: remove recording from memory
        this.playingActive = false;
        this.recordingFinished = false;
        this.recordingStarted = false;
        this.wavesurfer.destroy();
        this.playbackSpeed = 1;
        this.visualizerZoom = 100;
    }

    // wavesurfer zoom method
    public setZoom(factor) {
        this.visualizerZoom = factor;
        this.wavesurfer.zoom(factor);
    }

    // wavesurfer playback rate method
    public setPlaybackRate(factor) {
        this.playbackSpeed = factor;
        this.wavesurfer.setPlaybackRate(factor);
    }

}
