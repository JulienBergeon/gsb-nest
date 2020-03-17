import { Converter } from "src/common/converter";
import { UpdateMedicinesDto } from "../model/updateMedicines.Dto";
import { Medicines } from "../medicines.entity";

export class UpdateMedicinesDtoConverter implements Converter<UpdateMedicinesDto, Partial<Medicines>>{
    constructor() {}

    convertInbound(medicines: UpdateMedicinesDto): Partial<Medicines> {
        return medicines as Partial<Medicines>;
    }
}