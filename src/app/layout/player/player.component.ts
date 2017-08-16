import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
declare const navigator: any;
declare const MediaRecorder: any;
import wavesurfer from 'wavesurfer.js';
import {RepositoryService} from '../../shared/services/repository.service';
import {Recording} from '../../shared/models/recording';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
    private recordingId: string;
    private recording: Recording = new Recording(null);
    // -- player state --------------------------------------------------------
    public playingActive = false;
    // -- recorder objects ----------------------------------------------------
    private chunks: any = [];
    private mediaRecorder: any;
    private recordingLength = 0;
    // -- save recording dialog -----------------------------------------------
    // -- visualizer ----------------------------------------------------------
    public wavesurfer: any;
    // -- wavesurfer dynamic parameters
    public playbackSpeed = 1;
    public visualizerZoom = 100;
    // -- recording as a file
    private recordingFile: Blob;
    // -- constructor ---------------------------------------------------------
    constructor(private ref: ChangeDetectorRef,
                private repositoryService: RepositoryService,
                private route: ActivatedRoute,
                private router: Router) {
    }
    // -- methods -------------------------------------------------------------
    ngOnInit() {
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

        const getRouteParams = this.route
            .queryParams
            .subscribe(params => {
                this.recordingId = params['id'] || 0;
                this.repositoryService.getRecording(this.recordingId).subscribe((d) => {
                    const byteCharacters = atob(d.recordingContent);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { 'type': 'audio/wav;' });

                    this.wavesurfer.loadBlob(blob);
                    console.log(d);

                    this.recording = new Recording(null);
                    this.recording.recordingDateTime = d.recordingDateTime;
                    this.recording.patientAge = d.patientAge;
                    this.recording.patientWeight = d.patientWeight;
                    this.recording.patientHeight = d.patientHeight;
                    this.recording.patientSex = d.patientSex;
                    this.recording.patientEmail = d.patientEmail;
                    this.recording.patientName = d.patientName;

                    this.recording.recordingPosition = d.recordingPosition;
                    this.recording.recordingDevice = d.recordingDevice;
                });
            });


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
    private saveBlob() {
        /*const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = window.URL.createObjectURL(this.recordingFile);
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(a.href);*/

        const reader = new FileReader();
        reader.readAsDataURL(this.recordingFile);
        reader.onloadend = () => {
        };
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

    public cmdDiscardRecording() {
    }

    public cmdOpenSaveDialog() {
        // this.saveModal.open();
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
