export interface Role {
    id: number;
    name: string;
    description: string | null;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    role: Role;
    email_verified_at: string | null;
}

export interface AuthProps {
    auth: {
        user: User | null;
    };
    [key: string]: any;
}

export interface LoginData {
    email: string;
    password: string;
    remember?: boolean;
    [key: string]: any;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    [key: string]: any;
}
