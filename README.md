# A.FITAMINE Android starter — design pass 1

A coach-only coaching workspace packaged for Android with Capacitor. The supplied
React application is preserved in `www/index.html`; this pass introduces the
first visual design system without removing its coaching workflows.

## Design pass 1

- Introduced a graphite/ink interface with a restrained lime accent.
- Refined the fixed desktop sidebar, active navigation state, top bar, and
  content spacing.
- Added responsive spacing and touch-target refinements for smaller screens.
- Improved focus-visible keyboard accessibility and reduced-motion handling.
- Tuned the bright theme so its sidebar, header, and active navigation remain
  legible.
- Changed the weight-log date default and goal projection anchor to use the
  current date rather than a fixed historical date.
- Removed a duplicated “Biological Sex” field label.

## Build the first APK

Requirements: Node.js 20+, Android Studio, Android SDK, and a JDK supported by
the installed Android Gradle Plugin.

```bash
npm install
npx cap add android
npx cap sync android
npx cap open android
```

In Android Studio, allow Gradle sync and install any requested Android SDK
components. Then choose **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
The debug APK is normally created at:

`android/app/build/outputs/apk/debug/app-debug.apk`

Command-line debug build after Android Studio has generated the `android/`
folder:

```bash
npm run android:build:debug
```

For a signed release APK, create a private signing key in Android Studio and
use **Build > Generate Signed Bundle / APK**. Keep the keystore and passwords
private and backed up. Never commit them to source control.

## Important before publishing

This is a development scaffold, not a store-ready release. The supplied HTML
still loads React, ReactDOM, Babel, Tailwind, and fonts from public CDNs. The
first APK therefore needs internet access to load those resources. Before
production we should bundle dependencies locally, remove the runtime Babel
compiler, and test offline behavior plus PDF/print behavior on real Android
devices.

The app currently stores client records in browser `localStorage`. It does not
provide coach authentication, encrypted cloud sync, or a secure multi-device
database. Client health/fitness information is sensitive: replace demo profiles
with consented test data, add appropriate security and backups, and publish a
privacy policy before collecting real client data. The intended product
audience for this project is one coach/operator; client accounts are out of scope
for the current design direction.

## Next design iteration

1. Review this visual direction on desktop and on a real Android phone.
2. Refine each screen’s hierarchy, chart styling, tables, forms, and empty states.
3. Add app icon, splash screen, and consistent loading/error states.
4. Bundle frontend dependencies and remove CDN/runtime compilation.
5. Add safe local backup/export and test restore behavior.
6. Generate a signed APK for direct distribution and/or an AAB for Google Play.

## Project identity

- Display name: A.FITAMINE
- Android application ID: `com.afitamine.coaching`
- Project version: `0.2.0`


## Design update 0.3.0 — monochrome + PDF export

- The app-wide visual palette is now black, white, and neutral greys. Existing colored indicators are rendered in greyscale so no screen keeps a separate accent palette.
- Client dossier export now generates a PDF document directly with jsPDF instead of relying on a popup window and browser print dialog. This is more compatible with Android WebView/Capacitor.
- The PDF includes client overview, biometrics, metabolic metrics, macro targets, vitals, recent weight logs, training split, movement screen, and coach remarks.
- PDF generation loads jsPDF from a CDN; the first export therefore requires an internet connection. Bundle the jsPDF library locally before promising offline export.
- Verify Android download behavior on a physical device. If the WebView does not expose downloads, the next native integration step is Capacitor Filesystem + Share so the PDF can be saved/shared through Android.

## Build an APK online with GitHub Actions (no Android Studio required)

This project includes `.github/workflows/android-apk.yml`. GitHub's hosted
runner installs the Android build tools, generates the Capacitor Android
project, builds a **debug APK**, and stores it as a downloadable workflow
artifact.

1. Sign in to GitHub and create a **new private repository** (recommended
   because this project is a coaching app).
2. Extract this ZIP on your computer.
3. Upload the *contents* of the extracted folder to the repository's `main`
   branch. Make sure the `.github/workflows/android-apk.yml` file is included.
   GitHub's web uploader may hide dot-folders; if so, use GitHub Desktop or
   the browser's **Add file > Upload files** flow and verify the workflow file
   is present after upload.
4. Open the repository's **Actions** tab and select **Build A.FITAMINE Android
   APK**. If it has not started automatically, choose **Run workflow**.
5. Open the completed run, scroll to **Artifacts**, and download
   `AFITAMINE-debug-apk`. Extract it to get `app-debug.apk`.

The workflow also runs automatically whenever you push a commit to `main`.
The artifact is a debug APK for testing, not a signed production release.
Do not publish it to Google Play. A release build needs a private signing key
and a separate signed-release workflow. Never upload your keystore or signing
passwords into the repository.

The first build downloads npm and Android build dependencies, so GitHub's
runner needs internet access. The app itself also currently loads several
frontend libraries and jsPDF from CDNs, so app startup and PDF export require
internet access in this version.
