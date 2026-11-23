(function () {
  "use strict";
  var N = window.NOVEL;
  var $ = function (id) { return document.getElementById(id); };
  var store = {
    get: function (k) { try { return localStorage.getItem("two-attack:" + k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem("two-attack:" + k, v); } catch (e) {} }
  };
  var current = 0;

  /* 연령 확인 */
  if (store.get("adult") !== "1") $("gate").hidden = false;
  $("gate-ok").onclick = function () { store.set("adult", "1"); $("gate").hidden = true; };

  /* 글자 크기, 밝기 */
  var fs = parseInt(store.get("fs") || "18", 10);
  function applyFs() { document.documentElement.style.setProperty("--fs", fs + "px"); store.set("fs", fs); }
  applyFs();
  $("font-up").onclick = function () { fs = Math.min(26, fs + 1); applyFs(); };
  $("font-down").onclick = function () { fs = Math.max(14, fs - 1); applyFs(); };
  var theme = store.get("theme");
  if (theme) document.documentElement.dataset.theme = theme;
  $("theme").onclick = function () {
    var dark = document.documentElement.dataset.theme === "dark" ||
      (!document.documentElement.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
    theme = dark ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    store.set("theme", theme);
  };

  /* 목차 */
  N.chapters.forEach(function (c, i) {
    var li = document.createElement("li");
    var b = document.createElement("button");
    b.type = "button";
    b.innerHTML = '<span class="n">' + c.id + '</span><span class="t"></span><span class="a"></span>';
    b.querySelector(".t").textContent = c.title;
    b.querySelector(".a").textContent = "단편선 순간들 「" + c.title + "」, " + c.album;
    b.onclick = function () { open(i, 0); };
    li.appendChild(b);
    $("toc").appendChild(li);
  });

  function showCover() {
    $("cover").hidden = false; $("reader").hidden = true; $("bar").hidden = true;
    var saved = store.get("pos");
    $("resume").hidden = !saved;
    history.replaceState(null, "", location.pathname);
    window.scrollTo(0, 0);
  }

  function open(i, scrollRatio) {
    current = i;
    var c = N.chapters[i];
    var art = $("chapter");
    art.innerHTML = "";
    var h = document.createElement("p"); h.className = "ch-num"; h.textContent = c.number; art.appendChild(h);
    var t = document.createElement("h2"); t.className = "ch-title"; t.textContent = c.title; art.appendChild(t);
    var a = document.createElement("p"); a.className = "ch-album";
    a.textContent = "단편선 순간들, " + c.album; art.appendChild(a);
    c.paragraphs.forEach(function (p) {
      var el = document.createElement("p");
      if (p === "＊") { el.className = "sep"; el.textContent = "＊ ＊ ＊"; }
      else { el.className = "body" + (p.length < 30 ? " short" : ""); el.textContent = p; }
      art.appendChild(el);
    });
    $("cover").hidden = true; $("reader").hidden = false; $("bar").hidden = false;
    $("bar-ch").textContent = c.number + " · " + c.title;
    $("prev").disabled = i === 0;
    $("next").disabled = i === N.chapters.length - 1;
    history.replaceState(null, "", "#" + c.id);
    requestAnimationFrame(function () {
      var max = document.documentElement.scrollHeight - innerHeight;
      window.scrollTo(0, scrollRatio ? max * scrollRatio : 0);
      onScroll();
    });
  }

  function onScroll() {
    if ($("reader").hidden) return;
    var max = document.documentElement.scrollHeight - innerHeight;
    var r = max > 0 ? Math.min(1, scrollY / max) : 0;
    $("progress-fill").style.width = (r * 100) + "%";
    store.set("pos", current + ":" + r.toFixed(4));
  }
  addEventListener("scroll", onScroll, { passive: true });

  $("start").onclick = function () { open(0, 0); };
  $("resume").onclick = function () {
    var p = (store.get("pos") || "0:0").split(":");
    open(parseInt(p[0], 10) || 0, parseFloat(p[1]) || 0);
  };
  $("prev").onclick = function () { if (current > 0) open(current - 1, 0); };
  $("next").onclick = function () { if (current < N.chapters.length - 1) open(current + 1, 0); };
  $("to-cover").onclick = showCover;

  var m = location.hash.match(/^#(\d)$/);
  if (m && +m[1] >= 1 && +m[1] <= N.chapters.length) open(+m[1] - 1, 0); else showCover();
})();
