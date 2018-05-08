'use strict';

window.View = (function View() {
  let slides;
  let wrapper;
  let activeSlide;
  let activeSlideNumber = 1;
  let isInitialized = false;

  function init() {
    if (isInitialized) return;

    slides = Array.from(document.querySelectorAll('div.slider-wrapper .slider-slide'));
    wrapper = document.querySelector('div.slider-wrapper');

    slides.forEach((slide, index) => slide.dataset.number = index + 1);
    wrapper.dataset.activeSlide = activeSlideNumber;

    activeSlide = slides.find(slide => parseSlide(slide.dataset.number) === activeSlideNumber);
    activeSlide.style.left = '0%';
    activeSlide.style.opacity = '1';

    slides
      .filter(slide => slide !== activeSlide)
      .forEach(slide => slide.style.opacity = '0');

    isInitialized = true;
  }

  function parseSlide(slideNumber) {
    try {
      return parseInt(slideNumber || '0');
    } catch (err) {
      return 0;
    }
  }

  function activateSlide(slideNumber) {
    if (activeSlideNumber == slideNumber) return;

    const rightToLeft = activeSlideNumber < slideNumber;
    const newSlide = slides.find(slide => parseSlide(slide.dataset.number) === slideNumber);

    slides
      .filter(slide => slide !== activeSlide)
      .forEach(slide => {
        slide.style.removeProperty('transition');
        slide.style.opacity = '0';
      });

    newSlide.style.left = rightToLeft ? '100%' : '-100%';

    newSlide.style.transition = 'left .5s ease 0s, opacity .3s linear .3s';
    newSlide.style.opacity = '1';
    newSlide.style.left = '0%';

    activeSlide.style.transition = 'left .5s ease .2s, opacity .3s linear 0s';
    activeSlide.style.opacity = '0';
    activeSlide.style.left = rightToLeft ? '-100%' : '100%';

    wrapper.dataset.activeSlide = slideNumber;
    activeSlideNumber = slideNumber;
    activeSlide = newSlide;
  }

  return { init, activateSlide };
})();