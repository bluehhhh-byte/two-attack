// 사용: node tools/build_data.cjs
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'manuscript.md'), 'utf8').replace(/\r\n/g, '\n');
const [title, ...sections] = source.split(/^## 제(\d+)장\. (.+)$/m);
if (title.trim() !== '# 투 어택' || sections.length !== 18) {
  throw new Error('제목과 6개 장을 확인하세요.');
}

const chapters = [];
for (let offset = 0; offset < sections.length; offset += 3) {
  const [chapterId, subtitle, body] = sections.slice(offset, offset + 3);
  const id = Number(chapterId);
  if (id !== chapters.length + 1 || !body.trim()) {
    throw new Error(`제${id}장의 순서나 본문을 확인하세요.`);
  }

  const number = `제${id}장`;
  const paragraphs = body.trim().split(/\n\s*\n/).map((block) => block.replace(/\n/g, ' '));
  chapters.push({ id, fullTitle: `${number}. ${subtitle}`, number, subtitle, paragraphs });
}

const data = {
  title: '투 어택',
  chapterCount: chapters.length,
  totalParagraphs: chapters.reduce((sum, chapter) => sum + chapter.paragraphs.length, 0),
  chapters,
};
fs.writeFileSync(path.join(root, 'novel-data.js'), `window.NOVEL_DATA = ${JSON.stringify(data)};\n`);
console.log(`${data.chapterCount}장, ${data.totalParagraphs}문단`);
