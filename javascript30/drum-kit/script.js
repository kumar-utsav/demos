document.addEventListener('keydown', (event) => {
  const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
  key.classList.add('playing');

  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  audio.currentTime = 0; // this is to make sure that every time the key is pressed the sound plays from the start
  audio.play();
});

const keys = document.querySelectorAll('.key');

keys.forEach((key) => {
  key.addEventListener('transitionend', function (event) {
    if (event.propertyName !== 'transform') return;
    console.log(this.classList.remove('playing'));
  });
});
