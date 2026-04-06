import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  standalone: false
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  feedbackMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProducts().subscribe((products) => {
      this.product = products.find((item) => item.id === id);
    });
  }

  addToCart(): void {
    if (!this.product) {
      return;
    }

    this.cartService.addProduct(this.product);
    this.feedbackMessage = 'Item added to cart.';
  }
}
