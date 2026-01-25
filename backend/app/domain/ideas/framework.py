# app/domain/ideas/framework.py

def rule_based_framework(text: str):
    text_lower = text.lower()
    words = text.split()
    length = len(words)

    breakdown = {}
    total_score = 0

    #  Market Signal (0–10)
    market_keywords = ["ai", "saas", "automation", "platform", "developer", "api"]
    market_hits = sum(1 for k in market_keywords if k in text_lower)

    market_score = min(market_hits * 2, 10)
    breakdown["market"] = market_score
    total_score += market_score

    #  Problem Clarity (Founder Fit Proxy)
    problem_verbs = ["solve", "automate", "improve", "reduce", "increase", "simplify"]
    problem_hits = sum(1 for v in problem_verbs if v in text_lower)

    founder_fit_score = min(problem_hits * 3, 10)
    breakdown["founder_fit"] = founder_fit_score
    total_score += founder_fit_score

    #  Execution Complexity (inverse scoring)
    # Short ideas = simpler execution
    if length < 10:
        execution_score = 8
    elif length < 20:
        execution_score = 6
    else:
        execution_score = 4

    breakdown["execution"] = execution_score
    total_score += execution_score

    #  Moat Signal (heuristic)
    moat_keywords = ["data", "network", "community", "workflow", "integration"]
    moat_hits = sum(1 for k in moat_keywords if k in text_lower)

    moat_score = min(moat_hits * 2, 10)
    breakdown["moat"] = moat_score
    total_score += moat_score

    #  Revenue Potential
    revenue_keywords = ["b2b", "enterprise", "subscription", "pay", "pricing", "saas"]
    revenue_hits = sum(1 for k in revenue_keywords if k in text_lower)

    revenue_score = min(revenue_hits * 2, 10)
    breakdown["revenue"] = revenue_score
    total_score += revenue_score

    # Normalize to 0–50 scale (5 metrics × 10)
    rule_score = min(total_score, 50)

    return {
        "rule_score": rule_score,  # out of 50
        "breakdown": breakdown,
    }
