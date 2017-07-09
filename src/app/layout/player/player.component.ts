import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
declare const navigator: any;
declare const MediaRecorder: any;
import wavesurfer from 'wavesurfer.js';
import {RepositoryService} from '../../shared/services/repository.service';
import {Recording} from '../../shared/models/recording';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
    private recordingId: string;
    private recording: Recording;
    // -- player state --------------------------------------------------------
    public playingActive = false;
    // -- recorder objects ----------------------------------------------------
    private chunks: any = [];
    private mediaRecorder: any;
    private recordingLength = 0;
    // -- save recording dialog -----------------------------------------------
    // -- visualizer ----------------------------------------------------------
    private wavesurfer: any;
    // -- wavesurfer dynamic parameters
    private playbackSpeed = 1;
    private visualizerZoom = 100;
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

        const getRouteParams = this.route
            .queryParams
            .subscribe(params => {
                this.recordingId = params['id'] || 0;
                // console.log(this.recordingId);
                this.repositoryService.getRecording(this.recordingId).subscribe((d) => {
                    console.log('--- getting recording by id ---');
                    this.recording = d;
                    console.log(this.recording);
                    this.wavesurfer.loadBlob(this.recording.content);

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
