import { Category } from "./category";

export interface Product {
    id?: string;
    sku: string;
    name: string;
    image: string;
    cloudinary_id?: string;
    category: Category;
    brand?: string;
    isFeatured?: boolean;
    onSale?: boolean;
    priceBuy?: string;
    priceSell?: string;
    countInStock?: string;
    createAt?: Date
    updatedAt?:Date
}