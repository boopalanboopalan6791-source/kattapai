Katta Pai — Next.js + Firebase + Razorpay (starter)
=================================================

This project is a starter Next.js application for your Katta Pai delivery app.
It uses **Firebase (Firestore)** for data storage and **Razorpay** for payments (server-side).

Important: You must provide Firebase service account credentials and Razorpay keys as environment variables
when running locally or deploying to Vercel.

Files of interest:
- pages/index.js        — Storefront (customer)
- pages/admin.js        — Admin UI (add products, set delivery area)
- pages/api/products.js — API route to list/add/delete products (uses Firestore)
- pages/api/orders.js   — Create order and create Razorpay order server-side
- pages/api/area.js     — Read/write delivery area
- server/initFirebase.js — Initializes Firebase Admin using service account JSON

Environment variables required (set these in Vercel or locally):
- FIREBASE_PROJECT_ID  = your Firebase project id
- FIREBASE_SERVICE_ACCOUNT_JSON = the **entire** service account JSON (stringified)
- RZ_KEY_ID            = your Razorpay Key ID (test key)
- RZ_KEY_SECRET        = your Razorpay Key Secret (test secret)
- ADMIN_USER           = bala
- ADMIN_PASS           = (set your admin password)
- NEXT_PUBLIC_BASE_URL = (optional) e.g. https://kattapai.vercel.app

Local development (recommended):
1. Install dependencies: `npm install`
2. Create a `.env.local` file with your keys, for example:
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_SERVICE_ACCOUNT_JSON='{...}'  # paste entire JSON string (escape newlines)
   RZ_KEY_ID=rzp_test_xxx
   RZ_KEY_SECRET=xxx
3. Run dev server: `npm run dev`
4. Open http://localhost:3000

Deploying to Vercel:
1. Create a Vercel account and install Vercel CLI OR use the Vercel web UI.
2. Push this project to GitHub and import it to Vercel, or use the "Import Project" flow.
3. In Vercel project settings, add the environment variables listed above.
4. Deploy. Your site will be live on a vercel.app domain. To use `kattapai.com` you must add your domain in Vercel and update DNS records at your domain registrar.

Razorpay Integration notes:
- Use Razorpay test keys for sandbox payments. The server creates a Razorpay order. Frontend currently does a demo flow.
- To capture real payments and verify, you must implement client-side Razorpay checkout flow and webhook verification (we can add this next).

Firebase notes:
- Create a Firestore database in test mode for quick start (switch to production rules later).
- Generate a service account JSON from Firebase console -> Project Settings -> Service accounts -> Generate new private key.
- Copy the JSON into FIREBASE_SERVICE_ACCOUNT_JSON env variable (stringify it).

If you'd like, I can:
- Add full Razorpay client-side checkout (so customers can actually pay),
- Add authentication for Admin,
- Deploy this project to Vercel for you and connect `kattapai.com` (you'll need to provide domain registrar access or follow steps).

-- End of file
