import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { RoleNotFoundException } from '../../../common/exceptions';
import { User } from '../../entities/user.entity';
import { RoleService } from '../role/role.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly roleService: RoleService,
        private readonly configService: ConfigService,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { roleId, ...userData } = createUserDto;
        const role = await this.roleService.findOne(roleId);
        if (!role) {
            throw new RoleNotFoundException(roleId);
        }

        const saltRounds = parseInt(this.configService.get<string>('SALT_ROUNDS') ?? '10', 10);
        const passwordHashed = await bcrypt.hash(userData.passwordHash, saltRounds);

        const user = this.userRepository.create({
            ...userData,
            passwordHash: passwordHashed,
            role,
        });

        const savedUser = await this.userRepository.save(user);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash: _, ...userWithoutPassword } = savedUser;
        return userWithoutPassword as User;
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find({
            relations: {
                role: true,
            },
        });
    }

    async findOne(id: number, relations: boolean = false): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: { role: relations ? { rolePermissions: { permission: true } } : false },
        });
        if (!user) {
            throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        }
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { email },
            relations: {
                role: {
                    rolePermissions: {
                        permission: true,
                    },
                },
            },
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        const { roleId, passwordHash, ...userData } = updateUserDto;

        if (roleId) {
            const role = await this.roleService.findOne(roleId);
            if (!role) {
                throw new RoleNotFoundException(roleId);
            }
            user.role = role;
        }

        if (passwordHash) {
            const saltRounds = parseInt(this.configService.get<string>('SALT_ROUNDS') ?? '10', 10);
            user.passwordHash = await bcrypt.hash(passwordHash, saltRounds);
        }

        Object.assign(user, userData);
        const savedUser = await this.userRepository.save(user);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash: _, ...userWithoutPassword } = savedUser;
        return userWithoutPassword as User;
    }

    async remove(id: number): Promise<{ id: number }> {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
        return { id };
    }
}
