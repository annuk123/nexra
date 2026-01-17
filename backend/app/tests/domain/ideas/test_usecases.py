from app.domain.ideas.usecases import analyze_idea_text

def test_analyze_idea_text_basic():
    result = analyze_idea_text("AI startup idea")

    assert result["text_length"] == len("AI startup idea")
    assert result["score"] == len("AI startup idea") % 100

def test_analyze_idea_text_empty_string():
    result = analyze_idea_text("")

    assert result["text_length"] == 0
    assert result["score"] == 0

def test_analyze_idea_text_long_text():
    text = "a" * 150
    result = analyze_idea_text(text)

    assert result["text_length"] == 150
    assert result["score"] == 50
