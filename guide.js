// 개작판 전용: 목차 서랍에 '인물·낱말' 탭을 덧붙인다 (스포일러 없음).
(function () {
  if (window.TWO_ATTACK_EDITION !== 'revised') return;
  const tabs = document.getElementById('tabBtnBookmarks');
  const panelBm = document.getElementById('tabPanelBookmarks');
  const tabToc = document.getElementById('tabBtnToc');
  const panelToc = document.getElementById('tabPanelToc');
  if (!tabs || !panelBm || !tabToc || !panelToc) return;

  const people = [
    ['엘리프', '마흔 살 세터. 키 187센티미터, 어릴 적 별명은 ‘데브(거인)’. 한 시즌 계약으로 이스탄불의 데미르한 스포르에 온 ‘보험’. 이 이야기의 화자.'],
    ['파티흐', '스물아홉 살 포커 선수. 이름은 ‘정복자’라는 뜻. 손가락 사이로 늘 오케이 패를 굴린다. 1~4장에서 화자가 ‘당신’이라고 부르는 사람.'],
    ['케렘 데미르한', '구단주 그룹 회장의 아들이자 구단의 실제 주인. 2미터 가까운 키.'],
    ['데프네', '스물두 살 주전 세터. 웃을 때 눈이 먼저 웃는다. 엘리프를 ‘아블라’라고 부른다.'],
    ['어머니', '카이세리에 산다. 젊을 때 공을 쳤다. 딸에게 ‘첫 번째’라는 뜻의 이름을 지어 주었다.'],
    ['오잔 감독 · 세르칸', '팀의 감독과 트레이너.'],
    ['관리인 할아버지', '경기장 지하 장비실 곁에서 하루 다섯 번 기도하는 사람.'],
  ];
  const words = [
    ['세터 · 투 어택', '세터는 받아 올린 공을 두 번째로 만져 공격수에게 올려 주는 선수. 투 어택은 세터가 올려 주지 않고 두 번째 터치로 직접 넘기는 공격.'],
    ['작전타임', '감독이 경기를 30초 멈추는 것. 한 세트에 두 번뿐이다.'],
    ['술탄들의 리그', '터키 여자 배구 1부 리그의 별명.'],
    ['아블라 · 하늠 · 베이', '아블라는 ‘언니’. 하늠은 여성을, 베이는 남성을 높여 부르는 말.'],
    ['오케이', '찻집에서 밤새 두는 터키의 패 놀이. 숫자 없는 클로버 문양 패는 어떤 패든 될 수 있는 ‘가짜 오케이’.'],
    ['에잔', '하루 다섯 번 기도 시간을 알리는 모스크의 소리.'],
    ['라마단 · 이프타르', '라마단은 해가 떠 있는 동안 금식하는 이슬람의 달. 이프타르는 해가 진 뒤의 첫 식사.'],
    ['권능의 밤', '라마단의 스물일곱 번째 밤. 신이 처음 말씀을 내린 밤이라 하여 새벽까지 기도한다.'],
    ['얄르 · 헤레케 카펫', '얄르는 보스포루스 해안의 오래된 목조 저택. 헤레케는 오스만 궁전에 바치던 실크 카펫.'],
    ['올뤼뮈네', '‘죽을 때까지’. 응원단의 천에 적힌 말.'],
    ['카라괴즈와 하지바트', '라마단 밤에 공연하는 전통 그림자극의 두 인형. 늘 함께 다니며 티격태격한다.'],
    ['시미트 · 바클라바', '시미트는 참깨를 두른 고리 모양 빵. 바클라바는 얇은 반죽에 꿀을 먹인 과자.'],
  ];
  const esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const dl = list => '<dl class="guide-list">' + list.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('') + '</dl>';

  const style = document.createElement('style');
  style.textContent = `.guide-panel h3{font-size:.8rem;letter-spacing:.08em;color:var(--accent);margin:14px 6px 6px;font-weight:700}
.guide-list{margin:0 6px 8px}.guide-list dt{font-weight:700;font-size:.9rem;margin-top:10px;color:var(--text-primary,inherit)}
.guide-list dd{margin:3px 0 0;font-size:.84rem;line-height:1.6;color:var(--text-secondary)}
.guide-note{font-size:.76rem;color:var(--text-secondary);margin:6px 6px 14px;opacity:.8}`;
  document.head.append(style);

  const btn = document.createElement('button');
  btn.className = 'drawer-tab'; btn.id = 'tabBtnGuide'; btn.textContent = '인물·낱말';
  tabs.after(btn);
  const panel = document.createElement('div');
  panel.className = 'drawer-body guide-panel hidden'; panel.id = 'tabPanelGuide';
  panel.innerHTML = '<h3>등장인물</h3>' + dl(people) + '<h3>낱말 풀이</h3>' + dl(words) +
    '<p class="guide-note">결말을 알려 주는 내용은 넣지 않았습니다.</p>';
  panelBm.after(panel);

  btn.addEventListener('click', () => {
    btn.classList.add('active'); tabToc.classList.remove('active'); tabs.classList.remove('active');
    panel.classList.remove('hidden'); panelToc.classList.add('hidden'); panelBm.classList.add('hidden');
  });
  [tabToc, tabs].forEach(b => b.addEventListener('click', () => {
    btn.classList.remove('active'); panel.classList.add('hidden');
  }));
})();
