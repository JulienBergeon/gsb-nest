import { CreateMedicinesDto } from "../model/createMedicines.dto";
import { Medicines } from "../medicines.entity";
import { Converter } from "../../common/converter";

export class CreateMedicinesDtoConverter implements Converter<CreateMedicinesDto, Partial<Medicines>>{
    
    constructor() {}

    convertInbound(medicines: CreateMedicinesDto): Partial<Medicines> {
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