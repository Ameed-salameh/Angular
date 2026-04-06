import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  standalone: false
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  errorMessage = '';
  feedbackMessage = '';

  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Could not load products right now. Please try again.';
        this.loading = false;
      }
    });
  }

  onProductAdded(product: Product): void {
    this.cartService.addProduct(product);
    this.feedbackMessage = `${product.name} was added to your cart.`;
    setTimeout(() => {
      this.feedbackMessage = '';
    }, 2200);
  }
}
