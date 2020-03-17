import { MedicinesDto } from '../model/medicines.dto';
import { Medicines } from '../medicines.entity';
import { Converter } from '../../common/converter';

export class MedicinesDtoConverter implements Converter<MedicinesDto, Medicines>{
    constructor() {}

    convertOutbound(medicines: Medicines): MedicinesDto {
        let medicinesDto: MedicinesDto = {
            id: medicines.id,
            name: medicines.name,
            description: medicines.description,
            price: medicines.price,
            image: medicines.image
        };

        // if (user.role === RoleEnum.Patient) {
        //     userDto['doctors'] = user.doctors.map(d => d.id);
        // }

        return medicinesDto;
    }

    convertOutboundCollection(mediciness: Medicines[]): MedicinesDto[] {
        return mediciness.map((medicines) => this.convertOutbound(medicines));
    }
}