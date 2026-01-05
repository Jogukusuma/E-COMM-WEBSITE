import type { Product } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return image ? image.imageUrl : 'https://picsum.photos/seed/placeholder/600/400';
}

export const products: Product[] = [
  {
    id: 'galaxy-book-4-ultra',
    name: 'Galaxy Book 4 Ultra',
    description: 'A premium laptop with a stunning display and powerful performance for creative professionals.',
    price: 2399.99,
    category: 'Laptops',
    image: getImage('galaxy-book-4-ultra'),
  },
  {
    id: 'zenbook-duo',
    name: 'Zenbook Duo',
    description: 'The ultimate productivity laptop with dual screens for seamless multitasking.',
    price: 1999.99,
    category: 'Laptops',
    image: getImage('zenbook-duo'),
  },
  {
    id: 'gaming-pc-pro',
    name: 'Gaming PC Pro',
    description: 'A high-end gaming desktop with the latest components for an immersive gaming experience.',
    price: 3499.00,
    category: 'Desktops',
    image: getImage('gaming-pc-pro'),
  },
  {
    id: 'office-master-5',
    name: 'Office Master 5',
    description: 'A reliable and efficient desktop computer designed for business and office work.',
    price: 999.50,
    category: 'Desktops',
    image: getImage('office-master-5'),
  },
  {
    id: 'geforce-rtx-4090',
    name: 'GeForce RTX 4090',
    description: 'The flagship GPU for enthusiasts, delivering a quantum leap in performance.',
    price: 1599.00,
    category: 'Components',
    image: getImage('geforce-rtx-4090'),
  },
  {
    id: 'ryzen-9-9950x',
    name: 'AMD Ryzen 9 9950X',
    description: 'The top-tier CPU for gaming and content creation, offering unparalleled processing power.',
    price: 799.00,
    category: 'Components',
    image: getImage('ryzen-9-9950x'),
  },
  {
    id: 'samsung-odyssey-g9',
    name: 'Samsung Odyssey G9',
    description: 'An ultrawide curved gaming monitor that surrounds you with its immersive display.',
    price: 1499.99,
    category: 'Monitors',
    image: getImage('samsung-odyssey-g9'),
  },
  {
    id: 'logitech-mx-master-3s',
    name: 'Logitech MX Master 3S',
    description: 'The ultimate ergonomic mouse for creators and coders, with quiet clicks and precise tracking.',
    price: 99.99,
    category: 'Peripherals',
    image: getImage('logitech-mx-master-3s'),
  },
  {
    id: 'corsair-k100-keyboard',
    name: 'Corsair K100 RGB Keyboard',
    description: 'A premium mechanical gaming keyboard with optical switches and customizable RGB lighting.',
    price: 229.99,
    category: 'Peripherals',
    image: getImage('corsair-k100-keyboard'),
  },
  {
    id: 'wd-black-4tb-nvme',
    name: 'WD Black 4TB NVMe SSD',
    description: 'Blazing-fast storage with massive capacity for your games and applications.',
    price: 399.99,
    category: 'Components',
    image: getImage('wd-black-4tb-nvme'),
  },
  {
    id: 'gskill-trident-z5-64gb',
    name: 'G.Skill Trident Z5 64GB DDR5',
    description: 'High-performance DDR5 memory for extreme overclocking and next-gen gaming.',
    price: 259.99,
    category: 'Components',
    image: getImage('gskill-trident-z5-64gb'),
  },
  {
    id: 'macbook-pro-m4',
    name: 'MacBook Pro M4',
    description: 'The latest MacBook Pro with the powerful M4 chip for professionals on the go.',
    price: 2499.00,
    category: 'Laptops',
    image: getImage('macbook-pro-m4'),
  },
];
