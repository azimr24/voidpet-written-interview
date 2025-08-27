# Voidpet Interview Project

Shameless project (tested on iPhone 16 Pro) I worked on for the voidpet written interview as we were allowed to answer questions in **whatever format gets your ideas across most clearly.**

## Demo Video

[Demo Video](https://drive.google.com/file/d/1rE2CxPSTsYJvkFB20xtkkruM0xomCPiy/view?usp=sharing)

## Project Structure

- `/apps/api` - Backend API server
- `/apps/mobile` - Mobile application (React Native/Expo)

## Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- Docker (for running PostgreSQL database)
- Expo Go app (for testing on physical devices)
- Xcode (for iOS development)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd voidpet-interview/voidpet-written-interview
```

### 2. Set up the Backend (API)

1. Navigate to the API directory:
   ```bash
   cd apps/api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the environment variables as needed

4. Start the PostgreSQL database using Docker:
   ```bash
   docker-compose up -d
   ```

5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:4000`

### 3. Set up the Mobile App

1. Navigate to the mobile directory:
   ```bash
   cd ../mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   This will open the Expo development server in your browser.

4. Run the app on a device or emulator:
   - **iOS Simulator**: Press `i` in the terminal or click "Run on iOS simulator" in the browser
   - **Physical Device**: Scan the QR code with your phone's camera (iOS) or the Expo Go app (Android)

## Environment Variables

### API (`.env`)

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/monster_battler?schema=public"
JWT_SECRET="your-secret-key-here"
JWT_ISSUER="voidpet-written-interview"
JWT_AUDIENCE="voidpet-written-interview-mobile"
PORT=4000
```

## Available Scripts

### API
- `npm run dev` - Start the development server
- `npm run build` - Build the application
- `npm start` - Start the production server

### Mobile
- `npm start` - Start the Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser

## Database

The application uses PostgreSQL with Prisma ORM. Database migrations are managed using Prisma Migrate.

To create and apply a new migration:
```bash
cd apps/api
npx prisma migrate dev --name your_migration_name
```

