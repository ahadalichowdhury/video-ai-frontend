# My App

A modern Next.js application built with React and TailwindCSS, featuring a clean and responsive UI.

## Features

- Modern UI components using Radix UI
- Responsive design with TailwindCSS
- Type-safe development with TypeScript
- API integration with environment variable configuration
- Clean and maintainable code structure

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (version 18 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add:
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
my-app/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # Reusable UI components
│   └── services/         # API and other services
├── public/              # Static files
├── styles/             # Global styles
└── ...config files
```

## Available Scripts

- `npm run dev` - Runs the development server
- `npm run build` - Builds the application for production
- `npm start` - Runs the production server
- `npm run lint` - Runs ESLint for code linting

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [ESLint](https://eslint.org/) - Code linting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
