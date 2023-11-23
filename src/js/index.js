const carousel = document.getElementById('slides');
let currentIndex = 0;

function showSlide(index) {
  currentIndex = index;
  const translateValue = -index * 100 + '%';
  carousel.style.transform = 'translateX(' + translateValue + ')';
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % carousel.children.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + carousel.children.length) % carousel.children.length;
  showSlide(currentIndex);
}

// Iniciar o carrossel automaticamente
setInterval(nextSlide, 3000);



