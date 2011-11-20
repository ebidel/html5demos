hideSlides(); 

function hideSlides() {
  document.addEventListener('DOMContentLoaded', hideSlidesDomLoaded, false);
}

function hideSlidesDomLoaded() {
  var showCWS = slidesConfig.settings["showCWS"] == false ? false : true;
  var showIAP = slidesConfig.settings["showIAP"] == false ? false : true;
  var showDart = slidesConfig.settings["showDart"] == false ? false : true;

  if (!showCWS) {
    var cwsSlides = document.querySelectorAll('section.slides > article.cws-slide');
    for (var i = 0, slide; slide = cwsSlides[i]; i++) {
      slide.classList.add("hidden"); 
    } 
  }
  
  if (!showIAP) {
    var iapSlides = document.querySelectorAll('section.slides > article.iap-slide');
    for (var i = 0, slide; slide = iapSlides[i]; i++) {
      slide.classList.add("hidden"); 
    }
  }
  
  if (!showDart) {
    var dartSlides = document.querySelectorAll('section.slides > article.dart-slide');
    for (var i = 0, slide; slide = dartSlides[i]; i++) {
      slide.classList.add("hidden"); 
    }
  }
  
}

