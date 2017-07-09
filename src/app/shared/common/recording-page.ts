import {PagedResponse} from './paged-response';
import {RecordingDto} from './dto/recording-dto';
export class RecordingPage implements PagedResponse<RecordingDto> {

    content: RecordingDto[];
    first: number;
    last: number;
    number: number;
    numberOfElements: number;
    size: number;
    sort: string;
    totalElements: number;
    totalPages: number;
}
