export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Laptops' | 'Desktops' | 'Components' | 'Peripherals' | 'Monitors';
  image: string;
};

export type CartItem = {
  id: string;
  userId: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

// --- Auth Types ---

export interface User {
  id: string;
  email: string | null;
  name?: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password_DO_NOT_USE: string) => Promise<void>;
  signup: (email: string, password_DO_NOT_USE: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}
