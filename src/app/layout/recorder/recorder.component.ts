import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SaveModalComponent} from './components/save-modal/save-modal.component';
declare const navigator: any;
declare const MediaRecorder: any;
import wavesurfer from 'wavesurfer.js';
import {RepositoryService} from '../../shared/services/repository.service';
import {Recording} from '../../shared/models/recording';


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
    constructor(private ref: ChangeDetectorRef, private repositoryService: RepositoryService) {
    }
    // -- methods -------------------------------------------------------------
    ngOnInit() {
        const onSuccess = stream => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.onstop = e => {
                const blob = new Blob(this.chunks, {'type': 'audio/wav;'});
                console.log(this.chunks);
                this.wavesurfer.loadBlob(blob);
                this.recordingFile = blob;
                // this.chunks = [];
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
    private saveBlob() {
        /*const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = window.URL.createObjectURL(this.recordingFile);
        a.download = 'file.wav';
        a.click();
        window.URL.revokeObjectURL(a.href);*/

        const reader = new FileReader();
        reader.readAsDataURL(this.recordingFile);
        reader.onloadend = () => {
            /*const base64data = reader.result;
             console.log(base64data );*/
            // console.log(this.recordingFile);
            const recording = this.saveModal.recording; // new Recording(this.recordingFile);
            recording.content = this.recordingFile;
            recording.recordingLength = this.recordingLength;
            console.log('--- save blob ---');
            // console.log(window.URL.createObjectURL(this.recordingFile));
            /*recording.patientName = this.saveModal.patientName;
            recording.patientEmail = this.saveModal.patientEmail;
            recording.recordingPosition = this.saveModal.recordingPosition;
            recording.recordingDateTime = this.saveModal.recordingDateTime;
            recording.recordingDevice = this.saveModal.recordingDevice;
            recording.recordingLength = this.recordingLength;*/

            this.repositoryService.postRecording(recording).subscribe(r => console.log(r));
        };
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
        // radi: this.saveBlob('file.wav');
        this.playingActive = false;
        this.recordingFinished = false;
        this.recordingStarted = false;
        this.wavesurfer.destroy();
        this.playbackSpeed = 1;
        this.visualizerZoom = 100;
        this.saveBlob();
        // this.repositoryService.getUser().subscribe((user: User) => console.log(user));
        // this.repositoryService.postRecording(new Recording(1, this.recordingFile)).subscribe(r => console.log(r));

    }

    public cmdOpenSaveDialog() {
        this.saveModal.open();
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
