/*
  Interactions
  - Home: left list toggles right detail panel
  - Voice cards: "続きを読む" expands / collapses
  - Menu bar: mobile toggle
*/

// ===== Menu bar toggle (mobile) =====
function toggleMenu() {
  const nav = document.getElementById('menuNav');
  if (nav) {
    nav.classList.toggle('is-open');
  }
}

(function(){
  // ===== Home topic switcher =====
  const topicButtons = document.querySelectorAll('[data-topic-button]');
  const topicPanels = document.querySelectorAll('[data-topic-panel]');

  if(topicButtons.length && topicPanels.length){
    const show = (topic) => {
      topicButtons.forEach(btn => {
        btn.classList.toggle('is-active', btn.getAttribute('data-topic-button') === topic);
      });
      topicPanels.forEach(panel => {
        panel.hidden = panel.getAttribute('data-topic-panel') !== topic;
      });
    };

    // initial
    const initial = document.querySelector('[data-topic-button].is-active')?.getAttribute('data-topic-button')
      || topicButtons[0].getAttribute('data-topic-button');
    show(initial);

    topicButtons.forEach(btn => {
      btn.addEventListener('click', () => show(btn.getAttribute('data-topic-button')));
    });
  }

  // ===== "続きを読む" toggles =====
  const toggles = document.querySelectorAll('[data-voice-toggle]');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.voice-card');
      if(!card) return;
      const expanded = card.classList.toggle('is-expanded');
      btn.textContent = expanded ? '閉じる' : '続きを読む';
    });
  });
})();
