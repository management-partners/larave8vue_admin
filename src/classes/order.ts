import { Entity } from "@/interfaces/entity";
import { OrderDetail } from "./orderDetail";

export class Order implements Entity {
    id: number
    first_name: string
    last_name: string
    email: string
    post_code: string
    address: string
    tel: string
    mobile: string
    total: number
    total_quantity: number
    order_detail: OrderDetail[]

    constructor(id: number = 0, first_name: string = '', last_name: string = '', email: string = '',
        post_code: string = '', address: string = '', tel: string = '', mobile: string = '', total: number = 0,
        total_quantity: number = 0, order_detail: OrderDetail[] = []) {

        this.id = id
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.post_code = post_code
        this.address = address
        this.tel = tel
        this.mobile = mobile
        this.total = total
        this.total_quantity = total_quantity
        this.order_detail = order_detail
    }
}