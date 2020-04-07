import { MedicinesDto } from '../model/medicines.dto';
import { Medicine } from '../medicines.entity';
import { Converter } from '../../common/converter';

export class MedicinesDtoConverter implements Converter<MedicinesDto, Medicine>{
    constructor() {}

    convertOutbound(medicines: Medicine): MedicinesDto {
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

    convertOutboundCollection(mediciness: Medicine[]): MedicinesDto[] {
        return mediciness.map((medicines) => this.convertOutbound(medicines));
    }
}