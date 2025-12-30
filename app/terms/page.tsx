import { Section } from "@/design-system/layout/Section";

export default function TermsPage() {
  return (
    <Section size="sm">
      <span className="text-xs tracking-widest text-neutral-500">
        TERMS
      </span>

      <h1 className="mt-4 text-3xl sm:text-4xl font-semibold max-w-xl">
        Terms & Conditions
      </h1>

      <p className="mt-6 text-neutral-400 max-w-xl">
        These terms govern your use of Nexra AI.
        By accessing or using the product, you agree to these terms.
      </p>

      <div className="mt-16 space-y-12 max-w-xl text-neutral-300 leading-relaxed">

        {/* 1 */}
        <div>
          <h2 className="text-lg font-medium mb-2">
            What Nexra provides
          </h2>
          <p>
            Nexra AI provides analytical guidance intended to help founders
            think more clearly about startup ideas.
          </p>
          <p className="mt-4">
            Nexra does not provide legal, financial, or professional advice.
          </p>
        </div>

        {/* 2 */}
        <div>
          <h2 className="text-lg font-medium mb-2">
            No guarantees
          </h2>
          <p>
            Startup outcomes depend on many factors outside our control.
            Nexra does not guarantee accuracy, success, or results.
          </p>
          <p className="mt-4">
            You are responsible for decisions you make based on Nexra’s output.
          </p>
        </div>

        {/* 3 */}
        <div>
          <h2 className="text-lg font-medium mb-2">
            Your ideas and content
          </h2>
          <p>
            You retain full ownership of the ideas and content you submit.
          </p>
          <p className="mt-4">
            By submitting content, you grant Nexra permission to process it
            solely for providing and improving the service.
          </p>
        </div>

        {/* 4 */}
        <div>
          <h2 className="text-lg font-medium mb-2">
            Service changes
          </h2>
          <p>
            Nexra is an evolving product.
            Features, behavior, or availability may change at any time.
          </p>
          <p className="mt-4">
            We may pause or discontinue parts of the service without notice.
          </p>
        </div>

        {/* 5 */}
        <div>
          <h2 className="text-lg font-medium mb-2">
            Acceptable use
          </h2>
          <p>
            You agree not to misuse Nexra, attempt to exploit it,
            or interfere with its operation.
          </p>
        </div>

        {/* 6 */}
        <div>
          <h2 className="text-lg font-medium mb-2">
            Limitation of liability
          </h2>
          <p>
            To the maximum extent permitted by law,
            Nexra is not liable for indirect or consequential losses
            arising from use of the service.
          </p>
        </div>

        {/* 7 */}
        <div>
          <h2 className="text-lg font-medium mb-2">
            Contact
          </h2>
          <p>
            If you have questions about these terms, contact:
          </p>
          <p className="mt-2 text-neutral-400">
            hello@nexra.ai
          </p>
        </div>

      </div>

      <p className="mt-16 text-xs text-neutral-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </Section>
  );
}
