import { Component, OnInit } from '@angular/core';

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
  public startRecording() {
      this.recordingStarted = true;
  }

  public stopRecording() {
    this.recordingFinished = true;
  }

  public playerPlay() {
      this.playingActive = true;
      this.audio.play();
  }

  public playerPause() {
      this.playingActive = false;
      this.audio.pause();
  }

  public saveRecording() {
      // todo: call popup with form
      this.playingActive = false;
      this.recordingFinished = false;
      this.recordingStarted = false;
  }

  public discardRecording() {
      // todo: remove recording from memory
      this.playingActive = false;
      this.recordingFinished = false;
      this.recordingStarted = false;
  }
}
