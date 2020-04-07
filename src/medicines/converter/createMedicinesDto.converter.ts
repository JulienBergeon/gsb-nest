import { CreateMedicinesDto } from "../model/createMedicines.dto";
import { Medicine } from "../medicines.entity";
import { Converter } from "../../common/converter";

export class CreateMedicinesDtoConverter implements Converter<CreateMedicinesDto, Partial<Medicine>>{
    
    constructor() {}

    convertInbound(medicines: CreateMedicinesDto): Partial<Medicine> {
        let medicinesToCreate = {
            name: medicines.name,
            description: medicines.description,
            price: medicines.price,
            image: medicines.image
            //On peut rajouter l'indice de danger (le petit triangle attention), à voir.
        }
        return medicinesToCreate;
    }
}