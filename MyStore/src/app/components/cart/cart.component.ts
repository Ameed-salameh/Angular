import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartItem, CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  standalone: false
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  totalCost = 0;
  feedbackMessage = '';

  fullName = '';
  address = '';
  creditCard = '';

  private cartSubscription?: Subscription;
  private feedbackTimeoutId?: ReturnType<typeof setTimeout>;

  constructor(
    private readonly cartService: CartService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.totalCost = this.cartService.getTotalCost();
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
    if (this.feedbackTimeoutId) {
      clearTimeout(this.feedbackTimeoutId);
    }
  }

  onQuantityChange(item: CartItem, rawQuantity: string): void {
    const quantity = Number(rawQuantity);
    this.cartService.updateQuantity(item.product.id, quantity);
  }

  removeItem(productId: number): void {
    const removedItem = this.cartItems.find((item) => item.product.id === productId);
    this.cartService.removeProduct(productId);

    if (!removedItem) {
      return;
    }

    this.feedbackMessage = `${removedItem.product.name} was removed from your cart.`;
    if (this.feedbackTimeoutId) {
      clearTimeout(this.feedbackTimeoutId);
    }
    this.feedbackTimeoutId = setTimeout(() => {
      this.feedbackMessage = '';
    }, 2200);
  }

  checkout(valid: boolean | null): void {
    if (!valid || this.cartItems.length === 0) {
      return;
    }

    const orderTotal = this.totalCost;
    const orderName = this.fullName;

    this.cartService.clearCart();
    this.router.navigate(['/confirmation'], {
      state: { fullName: orderName, totalCost: orderTotal }
    });
  }
}
