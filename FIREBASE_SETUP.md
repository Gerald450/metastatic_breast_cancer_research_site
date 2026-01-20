# Firebase Setup Guide

This guide will help you set up Firebase Firestore for your MBC data application.

## Prerequisites

1. A Firebase account (sign up at https://firebase.google.com/)
2. Node.js and npm installed

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard:
   - Enter a project name
   - (Optional) Enable Google Analytics
   - Click "Create project"

## Step 2: Set Up Firestore Database

1. In your Firebase project, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Choose **Start in production mode** (or test mode for development)
4. Select a location for your database (choose the closest to your users)
5. Click "Enable"

## Step 3: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Register your app with a nickname (e.g., "MBC Web App")
5. Copy the Firebase configuration object

## Step 4: Install Dependencies

```bash
npm install firebase
```

For the migration script, you'll also need dotenv:

```bash
npm install --save-dev dotenv
```

## Step 5: Configure Environment Variables

Create a `.env.local` file in the root of your project:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

Replace the values with your actual Firebase configuration from Step 3.

**Important:** 
- Never commit `.env.local` to version control
- The `NEXT_PUBLIC_` prefix is required for Next.js to expose these variables to the browser

## Step 6: Set Up Firestore Security Rules

1. Go to **Firestore Database** → **Rules** in Firebase Console
2. For development, you can use these permissive rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if false; // Disable writes from client for security
    }
  }
}
```

**Note:** For production, implement proper authentication and security rules.

## Step 7: Migrate Data to Firestore

Run the migration script to import your JSON data:

```bash
node scripts/migrate-to-firebase.mjs
```

This script will:
- Load all JSON files from `data/extracted/`
- Create collections in Firestore:
  - `survival_over_time`
  - `prevalence_burden`
  - `demographics_age_race`
  - `metastatic_site_outcomes`
  - `references`
- Import all data in batches

## Step 8: Verify the Migration

1. Go to **Firestore Database** in Firebase Console
2. You should see the collections listed
3. Click on a collection to view the imported documents

## Step 9: Test Your Application

Start your Next.js development server:

```bash
npm run dev
```

Navigate to pages that use the data (e.g., `/clinical-outcomes`, `/epidemiology`) and verify that data loads correctly from Firestore.

## Troubleshooting

### Error: "Firebase: Error (auth/configuration-not-found)"
- Make sure all environment variables are set in `.env.local`
- Restart your Next.js dev server after adding environment variables

### Error: "Permission denied" when reading data
- Check your Firestore security rules
- Make sure read permissions are enabled

### Migration script fails
- Verify your Firebase credentials are correct
- Check that Firestore is enabled in your Firebase project
- Ensure you have write permissions (for the migration only)

### Data not loading in components
- Check browser console for errors
- Verify Firebase configuration is correct
- Ensure collections exist in Firestore

## Next Steps

1. **Set up proper security rules** for production
2. **Add authentication** if you need user-specific data
3. **Set up indexes** for complex queries (Firebase will prompt you)
4. **Monitor usage** in Firebase Console to track reads/writes

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

