
"use client"

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { CartItem, Product } from '@/lib/types';
import { useToast } from "@/hooks/use-toast"
import { useCollection, useFirebase } from '@/firebase';
import { collection, deleteDoc, doc, setDoc, writeBatch } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartLoading: boolean;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'sri-cart';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user, firestore } = useFirebase();
  const { toast } = useToast();

  const [localCart, setLocalCart] = useState<CartItem[]>([]);
  const [isCartLoading, setIsCartLoading] = useState(true);

  // Firestore cart for logged-in users
  const userCartCollection = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, 'cartItems');
  }, [firestore, user]);

  const { data: firestoreCart, isLoading: isFirestoreCartLoading } = useCollection<CartItem>(userCartCollection);

  // Load local cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedCart) {
      setLocalCart(JSON.parse(storedCart));
    }
    setIsCartLoading(false); // Initial local cart load is done
  }, []);
  
  // Sync local cart to firestore on login
  useEffect(() => {
    const syncCartOnLogin = async () => {
      if (user && firestore && localCart.length > 0) {
        const batch = writeBatch(firestore);
        localCart.forEach(item => {
          const docRef = doc(firestore, 'users', user.uid, 'cartItems', item.id);
          const itemWithUser = { ...item, userId: user.uid, productId: item.id };
          batch.set(docRef, itemWithUser);
        });
        await batch.commit();
        // Clear local cart after syncing
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setLocalCart([]);
      }
    };
    syncCartOnLogin();
  }, [user, firestore, localCart]);


  const cartItems = user ? (firestoreCart || []) : localCart;
  
  const addToCart = useCallback(async (product: Product, quantity = 1) => {
    const existingItem = cartItems.find(item => item.productId === product.id);
    const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

    if (user && firestore) {
      const cartItem: CartItem = { 
        id: product.id,
        userId: user.uid,
        productId: product.id,
        name: product.name, 
        price: product.price, 
        image: product.image, 
        quantity: newQuantity
      };
      const docRef = doc(firestore, 'users', user.uid, 'cartItems', product.id);
      await setDoc(docRef, cartItem, { merge: true });
    } else {
        const cartItem: CartItem = { 
            id: product.id,
            productId: product.id,
            userId: 'guest', // or some other placeholder
            name: product.name, 
            price: product.price, 
            image: product.image, 
            quantity: newQuantity
        };
      let updatedCart: CartItem[];
      if (existingItem) {
        updatedCart = localCart.map(item =>
          item.productId === product.id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        updatedCart = [...localCart, cartItem];
      }
      setLocalCart(updatedCart);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCart));
    }
    
    toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
    })
  }, [cartItems, firestore, localCart, toast, user]);

  const removeFromCart = useCallback(async (productId: string) => {
    if (user && firestore) {
      const docRef = doc(firestore, 'users', user.uid, 'cartItems', productId);
      await deleteDoc(docRef);
    } else {
      const updatedCart = localCart.filter(item => item.productId !== productId);
      setLocalCart(updatedCart);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCart));
    }
    toast({
      title: "Removed from Cart",
      description: `Item has been removed from your cart.`,
      variant: 'destructive'
    });
  }, [firestore, localCart, toast, user]);


  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    if (user && firestore) {
      const docRef = doc(firestore, 'users', user.uid, 'cartItems', productId);
      await setDoc(docRef, { quantity }, { merge: true });
    } else {
       const updatedCart = localCart.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        );
      setLocalCart(updatedCart);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCart));
    }
  }, [firestore, localCart, removeFromCart, user]);


  const clearCart = useCallback(async () => {
    if (user && firestore && firestoreCart) {
      const batch = writeBatch(firestore);
      firestoreCart.forEach(item => {
        const docRef = doc(firestore, 'users', user.uid, 'cartItems', item.id);
        batch.delete(docRef);
      });
      await batch.commit();
    } else {
      setLocalCart([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [user, firestore, firestoreCart]);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );
  
  const isLoading = user ? isFirestoreCartLoading : isCartLoading;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartLoading: isLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
