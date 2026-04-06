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

  fullName = '';
  address = '';
  creditCard = '';

  private cartSubscription?: Subscription;

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
  }

  onQuantityChange(item: CartItem, rawQuantity: string): void {
    const quantity = Number(rawQuantity);
    this.cartService.updateQuantity(item.product.id, quantity);
  }

  removeItem(productId: number): void {
    this.cartService.removeProduct(productId);
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
