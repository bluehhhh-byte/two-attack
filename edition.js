(async function () {
  const revised = new URLSearchParams(window.location.search).get('edition') === 'revised';
  window.TWO_ATTACK_EDITION = revised ? 'revised' : 'original';

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
    await loadScript(revised ? 'novel-data.js?v=20261127-aphorism' : 'novel-original.js?v=ac4af11');
    await loadScript('app.js?v=20261126-editions');
  } catch (error) {
    document.getElementById('currentPage').textContent = '본문을 불러오지 못했습니다. 페이지를 새로고침해 주세요.';
    console.error('Reader load failed:', error);
  }
})();
