// Random Background Image
function setRandomBackground() {
    const images = [
      'https://source.unsplash.com/1600x900/?nature',
      'https://source.unsplash.com/1600x900/?city',
      'https://source.unsplash.com/1600x900/?water',
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    document.querySelector('#app').style.backgroundImage = `url(${images[randomIndex]})`;
  }
  setRandomBackground();
  