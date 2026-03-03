export type DecisionBlock =
  | {
      id: string;
      type: "primary_risk";
      title: string;
      content: string;
      severity: number;
    }
  | {
      id: string;
      type: "explanation";
      title: string;
      content: string;
    }
  | {
      id: string;
      type: "proof_required";
      title: string;
      content: string;
    }
  | {
      id: string;
      type: "impact_shift";
      title: string;
      content: string;
    };