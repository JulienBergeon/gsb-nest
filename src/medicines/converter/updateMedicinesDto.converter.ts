import { Converter } from "src/common/converter";
import { UpdateMedicinesDto } from "../model/updateMedicines.Dto";
import { Medicine } from "../medicines.entity";

export class UpdateMedicinesDtoConverter implements Converter<UpdateMedicinesDto, Partial<Medicine>>{
    constructor() {}

    convertInbound(medicines: UpdateMedicinesDto): Partial<Medicine> {
        return medicines as Partial<Medicine>;
    }
}