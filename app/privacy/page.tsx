import { Section } from "@/design-system/layout/Section";
import { Mail } from "lucide-react";
import Link from "next/link";
export default function PrivacyPage() {
  return (
    <Section size="sm">
      <span className="text-xs tracking-widest text-neutral-500">
        PRIVACY
      </span>

      <h1 className="mt-4 text-3xl sm:text-4xl font-semibold max-w-xl text-neutral-300">
        Privacy Policy
      </h1>

      <p className="mt-6 text-neutral-400 max-w-xl">
        Nexra AI respects your privacy. This page explains what information
        we collect, why we collect it, and how we handle it.
      </p>

      <div className="mt-16 space-y-12 max-w-xl text-neutral-300 leading-relaxed">

        {/* 1 */}
        <div>
          <h2 className="text-lg font-medium mb-2">
            What we collect
          </h2>
          <p>
            We currently collect:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-2">
            <li>Email addresses when you join the waitlist</li>
            <li>Written responses you voluntarily submit as feedback</li>
          </ul>
          <p className="mt-4">
            We do not collect passwords, payment information,
            or sensitive personal data.
          </p>
        </div>

        {/* 2 */}
        <div>
          <h2 className="text-lg font-medium mb-2">
            How we use your information
          </h2>
          <p>
            We use the information you provide to:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-2">
            <li>Notify you about Nexra updates</li>
            <li>Understand how founders evaluate ideas</li>
            <li>Improve Nexra’s thinking and experience</li>
          </ul>
          <p className="mt-4">
            We do not sell your data or use it for advertising.
          </p>
        </div>

        {/* 3 */}
        <div>
          <h2 className="text-lg font-medium mb-2">
            Data storage
          </h2>
          <p>
            Your data is stored securely using modern infrastructure.
            Access is limited to the Nexra team.
          </p>
          <p className="mt-4">
            We keep data only as long as it’s necessary for the purposes
            described above.
          </p>
        </div>

        {/* 4 */}
        <div>
          <h2 className="text-lg font-medium mb-2">
            Your rights
          </h2>
          <p>
            You may request to:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-2">
            <li>Access your data</li>
            <li>Correct or delete your data</li>
            <li>Stop receiving updates</li>
          </ul>
        </div>

        {/* 5 */}
        <div>
          <h2 className="text-lg font-medium mb-2">
            Changes
          </h2>
          <p>
            This policy may change as Nexra evolves.
            Any meaningful updates will be reflected on this page.
          </p>
        </div>

        {/* 6 */}
        

<div>
  <h2 className="text-lg font-medium mb-2">
    Contact
  </h2>

  <p>
    If you have questions about privacy, reach out at:
  </p>

  <Link
    href="mailto:annu@nexralab.com"
    className="mt-2 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
  >
    <Mail size={16} />
    annu@nexralab.com
  </Link>
</div>

      </div>

      <p className="mt-16 text-xs text-neutral-500">
        Last updated: March 2026
      </p>
    </Section>
  );
}
