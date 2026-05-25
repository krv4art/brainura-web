import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the Brainura brain-training application.",
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="May 25, 2026">
      <p>
        <strong>Placeholder:</strong> This page will be replaced with a fully
        reviewed Terms of Service generated via Termly. Below is the working
        draft that captures the substance of the agreement.
      </p>

      <h2>1. Agreement</h2>
      <p>
        By installing, accessing, or using Brainura you agree to these Terms of
        Service. If you do not agree, do not use the service.
      </p>

      <h2>2. Service description</h2>
      <p>
        Brainura is a brain-training application providing cognitive exercises,
        progress tracking, and an optional subscription-based premium tier.
      </p>

      <h2>3. Subscriptions and billing</h2>
      <ul>
        <li>
          Subscriptions auto-renew until cancelled. You can manage and cancel
          subscriptions from your device&apos;s App Store / Google Play account
          settings.
        </li>
        <li>
          A one-time introductory offer may be available for new subscribers in
          some regions. Standard pricing applies after the introductory period.
        </li>
        <li>
          Refunds are handled by Apple App Store and Google Play according to
          their respective policies.
        </li>
      </ul>

      <h2>4. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Reverse-engineer or attempt to tamper with the application.</li>
        <li>Use the service to harm or harass other users.</li>
        <li>Resell, sublicense, or otherwise redistribute the service.</li>
      </ul>

      <h2>5. Intellectual property</h2>
      <p>
        All content, code, branding, and exercises within Brainura are the
        property of the developer or its licensors. You receive a limited,
        non-exclusive, revocable licence to use the app for personal,
        non-commercial purposes.
      </p>

      <h2>6. Disclaimers</h2>
      <p>
        Brainura is a wellness and entertainment product, not a medical device.
        It is not intended to diagnose, treat, cure, or prevent any disease or
        cognitive condition. Always consult a qualified healthcare professional
        for medical advice.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, the developer shall not be
        liable for indirect, incidental, or consequential damages arising from
        your use of the service.
      </p>

      <h2>8. Termination</h2>
      <p>
        We may suspend or terminate access if you violate these Terms. You can
        stop using the service and uninstall the app at any time.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These Terms are governed by the laws of Ukraine, without regard to
        conflict-of-law principles.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about these Terms:{" "}
        <a href="mailto:support@brainura.app">support@brainura.app</a>.
      </p>
    </LegalShell>
  );
}
