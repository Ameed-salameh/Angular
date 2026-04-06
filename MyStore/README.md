# MyStore

MyStore is a single-page e-commerce web application built with Angular. It allows users to browse products, open a product details page, add items to the cart, update quantities, remove products, complete checkout with form validation, and view an order confirmation page.

## Key Features

- Product list loaded using `HttpClient` from `public/data.json`
- Product cards with image, name, price, and add-to-cart action
- Product details page with image, name, price, and description
- Cart page with quantity update, remove item, and total cost calculation
- Checkout form validation:
	- Name minimum length
	- Address minimum length
	- 16-digit card pattern
- Order confirmation page after successful checkout
- Angular routing with `routerLink` and `router-outlet` for SPA navigation

## Tech and Structure

- Angular (module-based)
- `@Input` + `@Output` used between parent and child components
- `CartService` used to share cart data across screens
- TypeScript product model (`Product`) with typed properties

## Installation and Run

1. Install dependencies:

```bash
npm install
```

2. Start the app:

```bash
ng serve
```

3. Open in browser:

```text
http://localhost:4200/
```

## Available Scripts

- `npm start` or `ng serve`: run development server
- `npm run build` or `ng build`: production build
- `npm test` or `ng test`: run unit tests

## Project Notes

- The project is organized into `components`, `services`, and `models` for readability and maintainability.
- The app is designed to satisfy the MyStore rubric requirements in UX, data flow, component architecture, and routing.
