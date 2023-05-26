// Определить элементы
const sliderImages = document.querySelectorAll(".slider-item");
const sliderLine = document.querySelector(".slider-line");
const sliderDots = document.querySelectorAll(".dot");

let sliderCount = 0,
    sliderWidth;

// Адаптивность слайдера
window.addEventListener('resize', showSlide);

// Задает нужную ширину картинки и sliderLine
function showSlide() {
    sliderWidth = document.querySelector(".slider-wrapper").offsetWidth;
    sliderLine.style.width = sliderWidth * sliderImages.length + 'px';
    sliderImages.forEach(item => item.style.width = sliderWidth + 'px');

    rollSlider();
}
showSlide();

// Перелистывает слайд вперед
function nextSlide() {
    sliderCount++;
    if (sliderCount >= sliderImages.length) sliderCount = 0;

    rollSlider();
    thisSlide(sliderCount); 
}

// Задает шаг перемещения слайдов
function rollSlider() {
    sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
}

// Указывает какой слайд по счету активен
function thisSlide(index) {
    sliderDots.forEach(item => item.classList.remove("active-dot"));
    sliderDots[index].classList.add("active-dot");
}

// Вешает клик на dot
sliderDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        sliderCount = index;
        rollSlider();
        thisSlide(sliderCount);
    })
  })

// Автоматическое перелистывание слайдов
//setInterval(() => {
//nextSlide()
//}, 5000);