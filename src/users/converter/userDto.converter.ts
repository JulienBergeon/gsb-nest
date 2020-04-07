import { UserDto } from '../model/user.dto';
import { User } from '../user.entity';
import { Converter } from '../../common/converter';
import { RoleEnum } from '../../common/role.enum';
import { GenderEnum } from '../../common/gender.enum';

export class UserDtoConverter implements Converter<UserDto, User> {
    constructor() {}

    convertOutbound(user: User): UserDto {
        const userDto: UserDto = {
            id: user.id,
            address: user.address,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: GenderEnum[user.gender],
            role: RoleEnum[user.role],
            medicines: user.medicines,
        };

        return userDto;
    }

    convertOutboundCollection(users: User[]): UserDto[] {
        return users.map((user) => this.convertOutbound(user));
    }
}
