/* Philosophy page — reveal/hide reflection answer */
function revealAnswer(btn) {
  const answer = document.getElementById('reflection-answer');
  const isRevealed = answer.classList.contains('revealed');
  answer.classList.toggle('revealed', !isRevealed);
  btn.setAttribute('aria-expanded', !isRevealed ? 'true' : 'false');
  const revealText = (window.Lang && window.Lang.getStr('philosophy.reflection_btn')) || 'Reveal';
  const hideText   = (window.Lang && window.Lang.getStr('philosophy.reflection_btn_hide')) || 'Hide';
  btn.textContent  = isRevealed ? revealText : hideText;
}
