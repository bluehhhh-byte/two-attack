# 원고(md)를 웹북 데이터(novel-data.js)로 변환한다.
# 사용: py tools/build_data.py  (two-attack 폴더에서)
import json, re, pathlib

SRC = pathlib.Path(r"C:\Users\psych\Downloads\마지막 트릭_원고")
OUT = pathlib.Path(__file__).resolve().parent.parent / "novel-data.js"

SONGS = {
    1: "『음악만세』(2024)",
    2: "『연인들』(2026)",
    3: "『음악만세』(2024)",
    4: "『연인들』(2026)",
    5: "『음악만세』(2024)",
    6: "『음악만세』(2024)",
}

chapters = []
for i in range(1, 7):
    text = (SRC / f"ch{i:02d}.md").read_text(encoding="utf-8")
    lines = text.strip().split("\n")
    head = lines[0].lstrip("# ").strip()          # "1장 · Alice in Deep"
    num, _, sub = head.partition("·")
    blocks = re.split(r"\n\s*\n", "\n".join(lines[1:]).strip())
    paras = []
    for b in blocks:
        b = " ".join(x.strip() for x in b.split("\n")).strip()
        if not b:
            continue
        paras.append("＊" if b == "---" else b)
    chapters.append({
        "id": i,
        "number": num.strip(),
        "title": sub.strip(),
        "album": SONGS[i],
        "paragraphs": paras,
    })

data = {"title": "투 어택", "chapters": chapters}
OUT.write_text("window.NOVEL = " + json.dumps(data, ensure_ascii=False) + ";\n", encoding="utf-8")
print("chapters", len(chapters), "paragraphs", sum(len(c["paragraphs"]) for c in chapters))
