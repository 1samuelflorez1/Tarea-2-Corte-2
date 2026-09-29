import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { RoleService } from '../role/role.service';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
}));

describe('UserService', () => {
    const mockRoleService = {
        findOne: jest.fn(),
    };
    const mockConfigService = {
        get: jest.fn(),
    };
    const mockUserRepository = {
        find: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
    };
    let service: UserService;
    beforeEach(async () => {
        // Cleanup mocks
        jest.clearAllMocks();

        const module = await Test.createTestingModule({
            providers: [
                UserService, // No está mockeado.
                // Elementos que interactuan o usamos dentro del servicio de usuarios pero no
                // nos interesa probarlos
                { provide: RoleService, useValue: mockRoleService }, // Mock del roleService
                { provide: ConfigService, useValue: mockConfigService }, // Mock del configService
                { provide: getRepositoryToken(User), useValue: mockUserRepository }, // Mock del roleService
            ],
        }).compile();

        service = module.get<UserService>(UserService); // Service de los usuarios.
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return all users', async () => {
        // ARRANGE
        const mockRole: Role = {
            id: 1,
            name: 'admin',
            description: 'Description',
            users: [],
            rolePermissions: [],
        };
        const mockUsers: User[] = [
            {
                id: 1,
                username: 'user1',
                email: 'user1@gmail.com',
                bio: 'Bio 1',
                passwordHash: 'hash123',
                createdAt: new Date(),
                role: mockRole,
            },
            {
                id: 2,
                username: 'user2',
                email: 'user2@gmail.com',
                bio: 'Bio 1',
                passwordHash: 'hash123',
                createdAt: new Date(),
                role: mockRole,
            },
        ];

        // Simulando el comportamiento de lo que debería de hacer el metodo find del repositorio
        // i.e el repositorio debe de "retornar" los usuarios de la base de datos.
        // Cuando el servicio llame al repositorio, al metodo find, no busque en la base de datos,
        // sino retorne un conjunto de usuarios mock
        mockUserRepository.find.mockResolvedValue(mockUsers);

        // ACT
        // Hacemos el llamado del método a probar.
        const users = await service.findAll();

        // ASSERT
        expect(users).toEqual(mockUsers);
        expect(mockUserRepository.find).toHaveBeenCalledWith({
            relations: {
                role: true,
            },
        });
        expect(users.length).toEqual(2);
    });

    it('should create user and transform password to hash', async () => {
        //ARRANGE
        const mockRole: Role = {
            // Supuesto rol guardado en la BD
            id: 1,
            name: 'admin',
            description: 'Description',
            users: [],
            rolePermissions: [],
        };
        const userInput: CreateUserDto = {
            // Informacion que envia el usuario desde el controlador al servicio
            username: 'user1',
            email: 'user1@gmail.com',
            bio: 'Bio 1',
            passwordHash: 'noHashedPassword',
            roleId: 1,
        };
        const savedUser = {
            // Lo que esperamos que retorne el metodo de guardar.
            id: 10,
            username: 'user1',
            email: 'user1@gmail.com',
            bio: 'Bio 1',
            createdAt: new Date(),
            role: mockRole,
        };
        const userCreated = {
            username: 'user1',
            email: 'user1@gmail.com',
            bio: 'Bio 1',
            passwordHash: 'hashedPassword',
            role: mockRole,
        };
        mockRoleService.findOne.mockResolvedValue(mockRole);
        mockConfigService.get.mockReturnValue('10');
        mockUserRepository.create.mockReturnValue(userCreated);
        mockUserRepository.save.mockResolvedValue(savedUser);
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
        //ACT
        const user = await service.create(userInput);
        //ASSERT
        expect(user).toEqual(savedUser);
        expect(mockUserRepository.save).toHaveBeenCalledWith(userCreated);
        expect(mockUserRepository.create).toHaveBeenCalledWith(userCreated);
    });
});
