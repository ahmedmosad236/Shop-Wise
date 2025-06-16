# ShopWise E-commerce Project

A modern e-commerce platform built with React, TypeScript, Tailwind CSS, and Zod.

## Features

- Responsive design for mobile and desktop
- Product browsing with filtering and sorting
- Shopping cart functionality
- User authentication and registration
- Form validation with Zod
- Tailwind CSS for styling

## Tech Stack

- **React**: UI library
- **TypeScript**: For type safety
- **React Router**: For navigation
- **Tailwind CSS**: For styling
- **Zod**: For schema validation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/shopwise.git
   cd shopwise
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
shopwise/
├── src/
│   ├── assets/        # Static assets like images
│   ├── components/    # Reusable UI components
│   │   ├── ui/        # Basic UI elements
│   │   ├── layout/    # Layout components
│   │   └── products/  # Product-related components
│   ├── features/      # Feature-specific logic
│   ├── hooks/         # Custom React hooks
│   ├── layout/        # Page layouts
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── store/         # State management
│   ├── types/         # TypeScript types
│   ├── App.tsx        # Main App component
│   └── main.tsx       # Entry point
├── public/            # Public assets
├── tailwind.config.js # Tailwind configuration
├── tsconfig.json      # TypeScript configuration
├── package.json       # Project dependencies
└── README.md          # Project documentation
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## Future Enhancements

- Product detail page
- Checkout process
- User profile management
- Order history
- Wishlist functionality
- Admin dashboard

## License

MIT
