import { Converter } from 'src/common/converter';
import { PaginatedDto } from './../dto/paginated.dto';

export class PaginatedDtoConverter<T> implements Converter<PaginatedDto<T>, [T[], number]> {
    constructor() {}

    convertOutbound([elements, nbElements]: [T[], number]): PaginatedDto<T> {
        return { elements, nbElements };
    }
}
