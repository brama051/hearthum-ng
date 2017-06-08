import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AnalyzedRecordingsComponent} from './analyzed-recordings.component';

describe('AnalyzedRecordingsComponent', () => {
    let component: AnalyzedRecordingsComponent;
    let fixture: ComponentFixture<AnalyzedRecordingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AnalyzedRecordingsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AnalyzedRecordingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
