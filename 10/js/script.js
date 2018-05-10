//required ------------------------------------------------
function setRequired(requiredValue) {
  var inputs=document.getElementsByTagName('input');
  var wasError = false;
  if (!(inputs === null)) {

    for (var i = 0; i < inputs.length; i++) {

      if (requiredValue === false) {
        inputs[i].required = requiredValue;
        inputs[i].wasCleared = true;
      }
      else {
        if ((inputs[i].wasCleared === true) && !(inputs[i].type === 'checkbox'))  {
          inputs[i].required = requiredValue;
          wasError = (!inputs[i].validity.valid)|| wasError;
        }
      }
    }
  }

  if ((wasError === false) && (requiredValue === true)) {
    var formProgram = document.getElementById('id-form-program');
    if (!formProgram === null) {
      formProgram.submit();
    }
  }
}

if (document.readyState || document.body.readyState == 'complete') {
  if (document.forms.length > 0) {
    setRequired(false);
  }
  // svg4everybody();
}

//мобильное меню ----------------------------------------
var navMain = document.querySelector('.header__navigation');
var navToggle = document.getElementById('id-toggle');

if (!(navMain === null)  && !(navToggle === null))  {
  if (navMain.classList.contains('header__navigation--nojs')) {
    navMain.classList.remove('header__navigation--nojs');
  }

  navToggle.addEventListener('click', function() {
    navMain.classList.toggle('header__navigation--closed');
    navMain.classList.toggle('header__navigation--opened');
  });
}

// карта -----------------------------------------------
function toggleMaps(mapIFrame, mapImg) {
  mapIFrame.classList.toggle('map__image--hide');
  mapIFrame.classList.toggle('map__image--show');
  mapImg.classList.toggle('map__image--hide');
  mapImg.classList.toggle('map__image--show');
}

var mapIFrame = document.getElementById('id-map-iframe');
var mapImg = document.getElementById('id-map-image');
var mapLinks = document.querySelectorAll('.js__link');

if (!(mapLinks === null) && !(mapIFrame === null)  && !(mapImg === null))  {


  if (mapIFrame.classList.contains('map__image--nojs')) {
    mapIFrame.classList.remove('map__image--nojs');
  }

  toggleMaps(mapIFrame, mapImg);


  for (var i = 0; i < mapLinks.length; i++) {
    mapLinks[i].onselectstart = function(e) {
      e.preventDefault();
    }

    mapLinks[i].addEventListener('dblclick', function (e) {
      e.preventDefault();
      toggleMaps(mapIFrame, mapImg);
    });
  }
}

//котик -----------------------------------------------
function switchStyle(slide, mod) {
  var classArr = ['slider__slide--half', 'slider__slide--full', 'slider__slide--none'];
  var toStyle='slider__slide--'+mod;
  for (var i = 0; i < classArr.length; i++) {
    if (classArr[i] === toStyle) {
      if (!slide.classList.contains(classArr[i])) {
        slide.classList.add(classArr[i]);
      }
    }
    else {
      if (slide.classList.contains(classArr[i])) {
        slide.classList.remove(classArr[i]);
      }
    }
  }
}

function viewMix() {
  var wrapper=document.getElementById('id-slider-wrapper');
  if (!(wrapper=== null)) {
    switchStyle(wrapper.children[0], 'half');
    switchStyle(wrapper.children[1], 'half');
  }
}

function viewBefore() {
  var wrapper=document.getElementById('id-slider-wrapper');
  if (!(wrapper=== null)) {
    switchStyle(wrapper.children[0], 'full');
    switchStyle(wrapper.children[1], 'none');
  }
}

function viewAfter() {
  var wrapper=document.getElementById('id-slider-wrapper');
  if (!(wrapper=== null)) {
    switchStyle(wrapper.children[0], 'none');
    switchStyle(wrapper.children[1], 'full');
  }
}


//заглушки модальных окон
function formOrder(e) {
  e.preventDefault();
  alert('Заглушка для модального окна заказа');
}

function viewAll(e, nameProduct) {
  e.preventDefault();
  alert('Заглушка дла кнопки -Показать все...-');
}
