# def rule_based_framework(text: str):
#     text_lower = text.lower()
#     words = text.split()
#     length = len(words)

#     breakdown = {}
#     total_score = 0

#     # Market signal
#     market_keywords = ["ai", "saas", "automation", "platform", "developer", "api"]
#     market_hits = sum(1 for k in market_keywords if k in text_lower)
#     market_score = min(market_hits * 2, 10) or 3
#     breakdown["market"] = market_score
#     total_score += market_score

#     # Founder Fit / Problem clarity
#     problem_verbs = ["solve", "automate", "improve", "reduce", "increase", "simplify"]
#     problem_hits = sum(1 for v in problem_verbs if v in text_lower)
#     founder_fit_score = min(problem_hits * 3, 10) or 2
#     breakdown["founder_fit"] = founder_fit_score
#     total_score += founder_fit_score

#     # Execution complexity
#     complexity_keywords = ["blockchain", "hardware", "deep learning", "robot", "medical"]
#     complexity_hits = sum(1 for k in complexity_keywords if k in text_lower)
#     execution_score = 3 if complexity_hits else 7
#     breakdown["execution"] = execution_score
#     total_score += execution_score

#     # Moat heuristic
#     moat_keywords = ["data", "network", "community", "workflow", "integration"]
#     moat_hits = sum(1 for k in moat_keywords if k in text_lower)
#     moat_score = min(moat_hits * 2, 10) or 1
#     breakdown["moat"] = moat_score
#     total_score += moat_score

#     # Revenue clarity
#     revenue_keywords = ["b2b", "enterprise", "subscription", "pay", "pricing", "saas"]
#     revenue_hits = sum(1 for k in revenue_keywords if k in text_lower)
#     revenue_score = min(revenue_hits * 2, 10) or 2
#     breakdown["revenue"] = revenue_score
#     total_score += revenue_score

#     # Normalize out of 50
#     rule_score = min(total_score, 50)

#     return {
#         "rule_score": rule_score,
#         "breakdown": breakdown,
#     }