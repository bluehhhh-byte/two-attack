# 원고(md)를 웹북 데이터(novel-data.js, window.NOVEL_DATA)로 변환한다.
# 사용: two-attack 폴더에서  PYTHONIOENCODING=utf-8 py tools/build_data.py
import json, re, pathlib

SRC = pathlib.Path(r"C:\Users\psych\Downloads\마지막 트릭_원고")
OUT = pathlib.Path(__file__).resolve().parent.parent / "novel-data.js"

chapters = []
for i in range(1, 7):
    text = (SRC / f"ch{i:02d}.md").read_text(encoding="utf-8")
    lines = text.strip().split("\n")
    head = lines[0].lstrip("# ").strip()          # "1장 · Alice in Deep"
    _, _, sub = head.partition("·")
    sub = sub.strip()
    blocks = re.split(r"\n\s*\n", "\n".join(lines[1:]).strip())
    paras = []
    for b in blocks:
        b = " ".join(x.strip() for x in b.split("\n")).strip()
        if b:
            paras.append("＊" if b == "---" else b)
    chapters.append({
        "id": i,
        "fullTitle": f"제{i}장. {sub}",
        "number": f"제{i}장",
        "subtitle": sub,
        "paragraphs": paras,
    })

data = {
    "title": "투 어택",
    "chapterCount": len(chapters),
    "totalParagraphs": sum(len(c["paragraphs"]) for c in chapters),
    "chapters": chapters,
}
OUT.write_text("window.NOVEL_DATA = " + json.dumps(data, ensure_ascii=False) + ";\n", encoding="utf-8")
print("chapters", len(chapters), "paragraphs", data["totalParagraphs"])
