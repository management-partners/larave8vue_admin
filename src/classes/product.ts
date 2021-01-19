import { Entity } from "@/interfaces/entity";
import { Categories } from "./categories";
import { Gallery } from "./gallery";

export class Product implements Entity {
    id: number
    cate: Categories
    name: string
    description: string
    gallery: Gallery[]
    price: number

    constructor(id: number = 0, cate: Categories, name: string = '', description: string = '', gallery: Gallery[] = [], price: number = 0) {
        this.id = id
        this.cate = cate
        this.name = name
        this.description = description
        this.gallery = gallery
        this.price = price
    }
}