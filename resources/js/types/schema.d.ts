export interface Category {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    parent_id: number | null;
    parent?: Category;
    children?: Category[];
}

export interface Shop {
    id: number;
    name: string;
    description: string | null;
    latitude: number | null;
    longitude: number | null;
    address: string | null;
    phone: string | null;
    is_active: boolean;
    owner_id: number | null;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: number;
    shop_id: number;
    category_id: number | null;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
    is_active: boolean;
    shop?: Shop;
    category?: Category;
    created_at: string;
    updated_at: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}
