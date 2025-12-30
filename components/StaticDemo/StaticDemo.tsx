"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import IdeaInput from "./IdeaInput/Idea-Input";
import UnderstandIdea from "./Understand-idea/Understand-idea";
import KeyAssumptions from "./Key-Assumptions/Key-Assumptions";
import RealityCheck from "./Reality-Check/Reality-Check";
import Decision from "./Decision/Decision";
import { DemoStep } from "./DemoStep";

export default function StaticDemoFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const goNext = () => {
    setCurrentStep((s) => Math.min(s + 1, 4));
  };

  const handleFinish = () => {
    router.push("/feedback");
  };

  return (
    <div className="max-w-3xl">

    <DemoStep>
      {currentStep === 0 && <IdeaInput onNext={goNext} />}
      </DemoStep>
      
      {currentStep === 1 && <UnderstandIdea onNext={goNext} />}
      {currentStep === 2 && <KeyAssumptions onNext={goNext} />}
      {currentStep === 3 && <RealityCheck onNext={goNext} />}
      {currentStep === 4 && <Decision onFinish={handleFinish} />}

    </div>
  );
}
