import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  readonly cartItems$ = this.cartItemsSubject.asObservable();

  addProduct(product: Product): void {
    const items = this.cartItemsSubject.getValue();
    const existingItem = items.find((item) => item.product.id === product.id);

    if (existingItem) {
      const updatedItems = items.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      this.cartItemsSubject.next(updatedItems);
      return;
    }

    this.cartItemsSubject.next([...items, { product, quantity: 1 }]);
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeProduct(productId);
      return;
    }

    const updatedItems = this.cartItemsSubject
      .getValue()
      .map((item) => (item.product.id === productId ? { ...item, quantity } : item));

    this.cartItemsSubject.next(updatedItems);
  }

  removeProduct(productId: number): void {
    const filteredItems = this.cartItemsSubject
      .getValue()
      .filter((item) => item.product.id !== productId);

    this.cartItemsSubject.next(filteredItems);
  }

  getTotalCost(): number {
    return this.cartItemsSubject
      .getValue()
      .reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}
