import { Component } from '@angular/core';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css',
  standalone: false
})
export class OrderConfirmationComponent {
  fullName = history.state.fullName ?? 'Customer';
  totalCost = history.state.totalCost ?? 0;
}
