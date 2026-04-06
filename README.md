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

1. Move to the Angular app folder:

```bash
cd MyStore
```

2. Install dependencies:

```bash
npm install
```

3. Start the app:

```bash
ng serve
```

4. Open in browser:

```text
http://localhost:4200/
```

## Notes

If `ng` is not recognized in your terminal, install Angular CLI globally:

```bash
npm install -g @angular/cli
```

You can also run the development server using npm scripts:

```bash
npm start
```

## Available Scripts (inside MyStore)

- `npm start`: run development server
- `npm run build`: production build
- `npm test`: run unit tests

If Angular CLI is installed globally, you can also use:

- `ng serve`
- `ng build`
- `ng test`

## Project Notes

- The project is organized into `components`, `services`, and `models` for readability and maintainability.
- The app is designed to satisfy the MyStore rubric requirements in UX, data flow, component architecture, and routing.
