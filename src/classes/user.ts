import { Entity } from "@/interfaces/entity";
import { Role } from "./role";

export class User implements Entity {
    id: number;
    name: string;
    email: string;
    role: Role;
    permission: string[];

    constructor(id: number = 0, name: string = '', email: string = '', role: Role = new Role(), permission: string[] = []) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.permission = permission;
    }

    canView(page: string) {
        return this.permission.some(p => p === `view_${page}`)
    }
    canEdit(page: string) {
        return this.permission.some(p => p === `edit_${page}`)
    }
    canDelete(page: string) {
        return this.permission.some(p => p === `view_${page}`)
    }
}