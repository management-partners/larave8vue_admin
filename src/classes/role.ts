import { Entity } from "@/interfaces/entity";
import { Permission } from "./permission";

export class Role implements Entity {
    id: number;
    name: string;
    description: string;
    permission: Permission[];

    constructor(id: number = 0, name: string = '', description: string = '', permission: any[] = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.permission = permission;
    }
}