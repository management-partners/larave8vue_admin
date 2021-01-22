import { Entity } from "@/interfaces/entity";
import { Gallery } from "./gallery";

export class OrderDetail implements Entity {

    id: number
    product_name: string
    product_description: string
    product_image: Gallery[]
    price: number
    quantity: number

    constructor(order_id: number = 0, product_name: string = '', product_description: string = '', product_image: Gallery[] = [], price: number = 0, quantity: number = 0) {
        this.id = order_id
        this.product_name = product_name
        this.product_description = product_description
        this.product_image = product_image
        this.price = price
        this.quantity = quantity
    }
}