import { Entity } from "@/interfaces/entity";
import { Role } from "./role";

export class User implements Entity {
    id: number;
    name: string;
    email: string;
    role: Role;
    password: string;
    password_confirm: string;
    permissions: string[];

    constructor(id: number = 0, name: string = '', email: string = '', role: Role = new Role, password: string = '', password_confirm: string = '', permission: string[] = []) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
        this.password_confirm = password_confirm;
        this.permissions = permission;
    }
}