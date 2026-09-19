(function () {
  const FEATURED = ["228-mokkin-neko", "227-shinobi-nyanko", "241-shichirin-sanma"];
  const games = Array.isArray(window.HUB_GAMES) ? window.HUB_GAMES.slice() : [];
  const list = document.getElementById("list");
  const countEl = document.getElementById("count");
  const qEl = document.getElementById("q");
  const chips = document.querySelectorAll(".chip");
  let range = "month";

  let lastTouchEnd = 0;
  document.addEventListener("touchend", function (e) {
    if (e.target.closest("[data-scrollable], input, a, button")) return;
    const now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
  }, { passive: false });
  document.addEventListener("dblclick", function (e) { e.preventDefault(); });

  chips.forEach(function (chip) {
    chip.addEventListener("pointerdown", function () {
      chip.classList.add("is-pressed");
      if (navigator.vibrate) navigator.vibrate(12);
    });
    chip.addEventListener("pointerup", function () { chip.classList.remove("is-pressed"); });
    chip.addEventListener("pointercancel", function () { chip.classList.remove("is-pressed"); });
    chip.addEventListener("click", function () {
      range = chip.getAttribute("data-range") || "all";
      chips.forEach(function (c) { c.classList.toggle("is-on", c === chip); });
      render();
    });
  });

  qEl.addEventListener("input", render);

  function monthStart() {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-01";
  }
  function fiscalStart() {
    const d = new Date();
    const y = d.getFullYear();
    const fy = d.getMonth() + 1 >= 4 ? y : y - 1;
    return fy + "-04-01";
  }
  function inRange(game) {
    if (range === "month") return game.created >= monthStart();
    if (range === "year") return game.created >= fiscalStart();
    return true;
  }

  function filtered() {
    const q = (qEl.value || "").trim().toLowerCase();
    const feat = {};
    FEATURED.forEach(function (id, i) { feat[id] = i; });
    return games.filter(function (g) {
      if (!inRange(g)) return false;
      if (!q) return true;
      return (g.title + " " + g.one + " " + g.repo).toLowerCase().indexOf(q) !== -1;
    }).sort(function (a, b) {
      const fa = feat.hasOwnProperty(a.repo) ? feat[a.repo] : 99;
      const fb = feat.hasOwnProperty(b.repo) ? feat[b.repo] : 99;
      if (fa !== fb) return fa - fb;
      return a.created < b.created ? 1 : -1;
    });
  }

  function render() {
    const rows = filtered();
    list.textContent = "";
    const label = range === "month" ? "今月" : range === "year" ? "今年度" : "すべて";
    countEl.textContent = label + "  " + rows.length + "本";
    if (!rows.length) {
      const empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = "見つかりませんでした。";
      list.appendChild(empty);
      return;
    }
    const frag = document.createDocumentFragment();
    rows.forEach(function (g) {
      const row = document.createElement("article");
      row.className = "row";
      const body = document.createElement("div");
      const name = document.createElement("h2");
      name.className = "name";
      name.textContent = g.title || g.repo;
      const meta = document.createElement("p");
      meta.className = "meta";
      const date = document.createElement("span");
      date.className = "date";
      date.textContent = (g.created || "").replace(/-/g, ".");
      meta.appendChild(date);
      if (g.one) {
        meta.appendChild(document.createTextNode(g.one));
      }
      body.appendChild(name);
      body.appendChild(meta);
      const play = document.createElement("a");
      play.className = "play";
      play.href = g.url;
      play.textContent = "遊ぶ";
      play.setAttribute("aria-label", (g.title || g.repo) + "を遊ぶ");
      play.addEventListener("pointerdown", function () {
        play.classList.add("is-pressed");
        if (navigator.vibrate) navigator.vibrate(12);
      });
      play.addEventListener("pointerup", function () { play.classList.remove("is-pressed"); });
      play.addEventListener("pointercancel", function () { play.classList.remove("is-pressed"); });
      row.appendChild(body);
      row.appendChild(play);
      frag.appendChild(row);
    });
    list.appendChild(frag);
  }

  render();
})();
