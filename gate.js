(function () {
  var g = document.getElementById('ageGate');
  var ok = false;
  try { ok = localStorage.getItem('two_attack_adult_v1') === '1'; } catch (e) {}
  if (!ok) g.hidden = false;
  document.getElementById('ageGateOk').onclick = function () {
    try { localStorage.setItem('two_attack_adult_v1', '1'); } catch (e) {}
    g.hidden = true;
  };
})();
