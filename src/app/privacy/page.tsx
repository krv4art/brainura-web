import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Brainura collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="May 25, 2026">
      <p>
        <strong>Placeholder:</strong> This page will be replaced with a
        full GDPR / CCPA / COPPA-compliant privacy policy generated via Termly
        (or another vendor). For now this draft outlines what data the Brainura
        app collects so reviewers can validate compliance.
      </p>

      <h2>1. Who we are</h2>
      <p>
        Brainura is a brain-training application operated by Hanna Kravchenko
        (the &quot;developer&quot;, &quot;we&quot;, &quot;us&quot;). Contact:{" "}
        <a href="mailto:support@brainura.app">support@brainura.app</a>.
      </p>

      <h2>2. Data we collect</h2>
      <p>
        When you use Brainura, we collect the following categories of data:
      </p>
      <ul>
        <li>
          <strong>Identifiers:</strong> OneSignal player ID and Supabase user ID
          for push notifications and cross-device sync.
        </li>
        <li>
          <strong>Usage data:</strong> exercise scores, completion times,
          training streaks, and feature interactions.
        </li>
        <li>
          <strong>Performance data:</strong> anonymised crash reports and
          performance metrics via Firebase Crashlytics and Analytics.
        </li>
        <li>
          <strong>Purchase data:</strong> subscription status and transaction
          history via Apple App Store / Google Play / RevenueCat.
        </li>
        <li>
          <strong>Approximate location:</strong> derived from IP address for
          regional content and analytics. We do <strong>not</strong> use precise
          GPS data.
        </li>
        <li>
          <strong>Email address:</strong> only if you choose to sign in or
          contact support.
        </li>
      </ul>

      <h2>3. How we use this data</h2>
      <ul>
        <li>To deliver and improve the Brainura experience.</li>
        <li>To track your training progress and brain-age estimate.</li>
        <li>To deliver push notifications you have explicitly opted in to.</li>
        <li>To detect and fix crashes and performance issues.</li>
        <li>To process subscriptions and detect fraudulent purchases.</li>
      </ul>

      <h2>4. Third-party services</h2>
      <p>
        Brainura uses the following processors. Each handles a narrow slice of
        data under its own privacy policy:
      </p>
      <ul>
        <li>
          <strong>Apple App Store / Google Play</strong> — payments and IAP.
        </li>
        <li>
          <strong>RevenueCat</strong> — subscription state.
        </li>
        <li>
          <strong>Firebase</strong> (Google) — crash reporting, analytics,
          remote config.
        </li>
        <li>
          <strong>OneSignal</strong> — push notifications.
        </li>
        <li>
          <strong>Supabase</strong> — backend storage and authentication.
        </li>
        <li>
          <strong>Groq</strong> — AI inference for the in-app support chat.
        </li>
      </ul>

      <h2>5. Advertising and tracking</h2>
      <p>
        Brainura does <strong>not</strong> display third-party advertisements
        and does <strong>not</strong> share data with advertising networks. We
        do not use the iOS App Tracking Transparency framework because we do
        not perform cross-app tracking.
      </p>

      <h2>6. Your rights (GDPR / CCPA)</h2>
      <ul>
        <li>Access the personal data we hold about you.</li>
        <li>Request correction or deletion.</li>
        <li>
          Export your data in a portable format (request via{" "}
          <a href="mailto:support@brainura.app">support@brainura.app</a>).
        </li>
        <li>Withdraw consent for non-essential processing at any time.</li>
      </ul>

      <h2>7. Children&apos;s privacy</h2>
      <p>
        Brainura is rated 4+ but the service is designed for adults. We do not
        knowingly collect personal data from children under 13 without parental
        consent.
      </p>

      <h2>8. Changes to this policy</h2>
      <p>
        We may update this policy occasionally. Material changes will be
        announced inside the app at least 14 days before they take effect.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions or data requests:{" "}
        <a href="mailto:support@brainura.app">support@brainura.app</a>.
      </p>
    </LegalShell>
  );
}
