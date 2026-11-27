(async function () {
  // 개작판 단일 판. 예전 개작판(?edition=revised) 독자의 읽던 위치·책갈피를 기본 키로 옮긴다.
  window.TWO_ATTACK_EDITION = 'revised';
  try {
    ['two_attack_progress_v1', 'two_attack_bookmarks_v1'].forEach((k) => {
      const old = localStorage.getItem(k + '_revised');
      if (old !== null) { localStorage.setItem(k, old); localStorage.removeItem(k + '_revised'); }
    });
  } catch (e) {}

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.append(script);
    });
  }

  try {
    await loadScript('novel-data.js?v=20261127-review9');
    await loadScript('app.js?v=20261127-review9');
    await loadScript('guide.js?v=20261127-review7');
  } catch (error) {
    document.getElementById('currentPage').textContent = '본문을 불러오지 못했습니다. 페이지를 새로고침해 주세요.';
    console.error('Reader load failed:', error);
  }
})();
