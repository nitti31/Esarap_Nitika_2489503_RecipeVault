# RecipeVault ��️

RecipeVault is a React recipe browser that lets users search recipes, filter by query/state, save favorites, and navigate with protected routes. Favorites persist in `localStorage`, and filter state is reflected in the URL so users can share or reload filtered views.

## Features

- React Router v6 routing
- URL-driven search and filter state using `useSearchParams`
- Protected `Favorites` page with simple auth logic
- Persistent favorites stored in browser `localStorage`
- Demo login experience with static credentials

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Open the app in your browser:

```
http://localhost:3000
```

4. To create a production build:

```bash
npm run build
```

## Environment Variables

This project does not require any custom environment variables for local development. It runs with the default Create React App configuration.

> If you add API keys, auth endpoints, or other service integrations later, add them here and update the app to read from `.env`.

## Demo Credentials

Use the following demo login to access the protected Favorites page:

- Email: `chef@demo.com`
- Password: `cook123`

## Deployed App

Deployed app: `https://your-deployment-url.example.com`

> Replace the link above with the actual production URL once the app is deployed.

## Notes

- The project is built with Create React App and uses `react-scripts`.
- Favorites are saved locally in the browser and are not shared across devices.
