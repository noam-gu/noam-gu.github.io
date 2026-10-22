/* מערכת מטבעות - תג בפינה + שמירה ב-localStorage */
(function () {
  const KEY = 'noam_coins';

  function loadCoins() {
    try { return parseInt(localStorage.getItem(KEY) || '0', 10) || 0; } catch (e) { return 0; }
  }
  function saveCoins(v) {
    try { localStorage.setItem(KEY, String(v)); } catch (e) { /* התעלם */ }
  }

  let coins = loadCoins();

  /* יצירת התג */
  const badge = document.createElement('div');
  badge.className = 'coin-badge';
  badge.innerHTML = '<span class="coin-icon">🪙</span><span class="coin-count">0</span>';
  document.body.appendChild(badge);
  const countEl = badge.querySelector('.coin-count');

  function render() { countEl.textContent = coins; }

  function bump() {
    badge.classList.remove('shake');
    badge.classList.remove('pop');
    void badge.offsetWidth; // reflow לאיפוס האנימציה
    badge.classList.add('pop');
  }

  /* שכבת ההבזק האדום (מסך מלא) */
  const flash = document.createElement('div');
  flash.className = 'lose-flash';
  document.body.appendChild(flash);

  function flashRed() {
    flash.classList.remove('show');
    void flash.offsetWidth;
    flash.classList.add('show');
  }

  function shakeBadge() {
    badge.classList.remove('pop');
    badge.classList.remove('shake');
    void badge.offsetWidth;
    badge.classList.add('shake');
    badge.classList.add('lose');
    setTimeout(function () { badge.classList.remove('lose'); }, 600);
  }

  render();
  bump(); // אנימציית כניסה

  /* הענקת n מטבעות עם פיצוץ וספירה */
  function award(n) {
    const br = badge.getBoundingClientRect();
    const ox = br.left + br.width / 2 - 13;
    const oy = br.top + br.height / 2 - 13;

    for (let i = 0; i < n; i++) {
      const coin = document.createElement('div');
      coin.className = 'fly-coin';
      coin.textContent = '🪙';
      document.body.appendChild(coin);

      const angle = Math.random() * Math.PI * 0.6;        // ימינה-למטה
      const dist = 50 + Math.random() * 60;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      const delay = i * 60;

      const anim = coin.animate([
        { transform: 'translate(' + ox + 'px,' + oy + 'px) scale(0.2)', opacity: 0 },
        { transform: 'translate(' + (ox + tx * 0.5) + 'px,' + (oy + ty * 0.5) + 'px) scale(1)', opacity: 1, offset: 0.25 },
        { transform: 'translate(' + (ox + tx) + 'px,' + (oy + ty) + 'px) scale(0.9)', opacity: 1, offset: 0.7 },
        { transform: 'translate(' + (ox + tx) + 'px,' + (oy + ty) + 'px) scale(0.4)', opacity: 0 }
      ], { duration: 700, delay: delay, easing: 'cubic-bezier(0.2,0.7,0.4,1)' });

      anim.onfinish = function () {
        coin.remove();
        coins += 1;
        render();
        bump();
        saveCoins(coins);
      };
    }
  }

  /* הפסד n מטבעות - מטבעות נופלים + הבזק אדום + רעידה (לא יורד מתחת ל-0) */
  function loseCoins(n) {
    flashRed();
    shakeBadge();
    const actual = Math.min(n, coins);
    if (actual <= 0) return;
    const br = badge.getBoundingClientRect();
    const ox = br.left + br.width / 2 - 13;
    const oy = br.top + br.height / 2 - 13;

    for (let i = 0; i < actual; i++) {
      const coin = document.createElement('div');
      coin.className = 'fly-coin lose-coin';
      coin.textContent = '🪙';
      document.body.appendChild(coin);

      const tx = (Math.random() - 0.5) * 90;        // פיזור לצדדים
      const ty = 70 + Math.random() * 50;           // נופל למטה
      const delay = i * 70;

      const anim = coin.animate([
        { transform: 'translate(' + ox + 'px,' + oy + 'px) scale(1)', opacity: 1 },
        { transform: 'translate(' + (ox + tx * 0.5) + 'px,' + (oy + ty * 0.5) + 'px) scale(0.95)', opacity: 1, offset: 0.4 },
        { transform: 'translate(' + (ox + tx) + 'px,' + (oy + ty) + 'px) scale(0.3)', opacity: 0 }
      ], { duration: 650, delay: delay, easing: 'cubic-bezier(0.4,0.1,0.6,1)' });

      anim.onfinish = function () {
        coin.remove();
        coins = Math.max(0, coins - 1);
        render();
        saveCoins(coins);
      };
    }
  }

  /* חשיפה גלובלית */
  window.NoamCoins = { add: award, lose: loseCoins, get: function () { return coins; } };
})();
