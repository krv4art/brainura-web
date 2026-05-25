# Brainura — Marketing Site

Landing page + legal pages (Privacy Policy, Terms of Service, Support) for the
Brainura brain-training app.

Live: `https://brainura-web.vercel.app` (until custom domain `brainura.app` is wired up)

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS v4** (CSS-first config)
- **TypeScript**
- **Manrope** font (matches the Flutter app's design system)
- Hosted on **Vercel**

## Pages

- `/` — landing (hero, features, CTA)
- `/privacy` — Privacy Policy (placeholder; replace with Termly-generated text)
- `/terms` — Terms of Service (placeholder; replace with Termly-generated text)
- `/support` — Support FAQ + contact email

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Deployment

Connected to Vercel via the GitHub App. Each push to `main` triggers a
production deploy automatically.

If the connection breaks:

1. <https://vercel.com/new> → Import `krv4art/brainura-web`
2. Framework preset: **Next.js** (auto-detected)
3. Build settings: defaults (no env vars needed)
4. Deploy

## Brand reference

Colours and typography mirror `lib/theme/design_system.dart` in the Flutter app:

- Primary: `#4A90E2` (Professional Blue)
- Secondary: `#7B68EE` (Royal Purple)
- Gradient: `#667EEA → #764BA2`
- Font: Manrope

## Legal text TODO

Once Termly generates the final Privacy Policy + Terms, replace the JSX bodies
in `src/app/privacy/page.tsx` and `src/app/terms/page.tsx`. Keep the
`LegalShell` wrapper for consistent styling.

## App Store / Play Store links

Currently point to:

- iOS: `https://apps.apple.com/app/id6761497811`
- Android: `https://play.google.com/store/apps/details?id=com.brainura.app`

These resolve once the apps go live in their respective stores.
