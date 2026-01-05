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
  name: string;
  price: number;
  image: string;
  quantity: number;
};
