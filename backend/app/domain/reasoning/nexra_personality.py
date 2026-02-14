# PERSONALITY_RULES = {
#     "safe": {
#         "tone": "restrictive",
#         "recommendation": (
#             "Execution is not justified yet. "
#             "Do not build until demand and willingness to pay are proven."
#         ),
#         "actions": [
#             "Secure 3–5 explicit commitments to pay (pre-orders, LOIs, or equivalents)",
#             "Manually validate the workflow without writing production code",
#             "Terminate the idea if commitments are not reached"
#         ],
#         "philosophy": "Preserve founder time. Default to stopping unless evidence is undeniable."
#     },

#     "balanced": {
#         "tone": "disciplinary",
#         "recommendation": (
#             "Execution is conditionally allowed. "
#             "Proceed only if validation and learning happen alongside building."
#         ),
#         "actions": [
#             "Validate the problem with real users before expanding scope",
#             "Build the smallest version that tests the core assumption",
#             "Prove a repeatable acquisition path before further investment"
#         ],
#         "philosophy": "No blind execution. Progress requires evidence at every step."
#     },

#     "aggressive": {
#         "tone": "unforgiving",
#         "recommendation": (
#             "Proceed at speed, but accept a fast death if signals do not appear immediately."
#         ),
#         "actions": [
#             "Ship a usable version within 7 days",
#             "Force distribution immediately and observe real behavior",
#             "Abandon the idea quickly if engagement or pull is weak"
#         ],
#         "philosophy": "Speed creates truth. Weak ideas should die quickly."
#     }
# }

# def get_personality(mode: str):
#     return PERSONALITY_RULES.get(mode, PERSONALITY_RULES["balanced"])
