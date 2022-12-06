import { Category } from "./category";

export interface Product {
    id?: string;
    sku: string;
    name: string;
    image?: string;
    cloudinaryId?: string;
    category: Category;
    brand?: string;
    priceBuy?: string;
    priceSell?: string;
    countInStock?: string;
    createAt?: Date
    updatedAt?:Date
}