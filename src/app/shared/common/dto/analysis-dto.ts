import {AnalyzerDto} from './analyzer-dto';
export class AnalysisDto {
    id: number;
    analysisComment: string;
    analysisDateTime: string;
    analysisOutcome: boolean;
    analysisTechnology: string;
    analyzer: AnalyzerDto;
    recordingRating: number;
}
