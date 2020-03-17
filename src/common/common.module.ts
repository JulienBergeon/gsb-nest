import { PaginatedDtoConverter } from './converter/paginated.converter';
import { Module } from "@nestjs/common";

@Module({
    providers: [PaginatedDtoConverter],
    exports: [PaginatedDtoConverter]
})
export class CommonModule {}