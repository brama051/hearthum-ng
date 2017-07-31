import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Recording} from '../../../../shared/models/recording';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {

    @Input() recording: Recording;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(this.recording);
    }

    ngOnInit() {

    }

}
