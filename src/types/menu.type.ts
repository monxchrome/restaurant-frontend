export interface IMenuItem {
    id: number;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    createdAt: string;
    category: string;
    visible: boolean;
    inStock: boolean;
}