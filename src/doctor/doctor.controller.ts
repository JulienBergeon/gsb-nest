import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

/**
 * @swagger
 * @ApiUseTags annotation swagger pour indiquer que ces routes appartiennent au controller DoctorController
 * @ApiResponse annotation swagger pour indiquer la forme de la réponse
 */
@ApiUseTags('doctor')
@Controller('doctor')
export class DoctorController {

    /**
     *
     * @param userService service qui permet de faire toutes les opérations relatives à la table User
     * @param userDtoConverter service qui permet de convertir un User en UserDto (et inversement)
     */
    constructor() {}
}
