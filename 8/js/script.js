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
  svg4everybody();
}


//котик -----------------------------------------------
function viewMix() {
  var wrapper=document.getElementById('id-slider-wrapper');
  if (!(wrapper=== null)) {
    var size=wrapper.clientWidth;
    wrapper.children[0].style.width=''+Math.floor(size/2)+'px';
    wrapper.children[1].style.width=''+Math.floor(size/2)+'px';
    wrapper.children[1].children[0].lastElementChild.style.left='-'+Math.floor(size/2)+'px';
    //ад, но когда этот код был написан, picture еще не было... :-)
  }
}

function viewBefore() {
  var wrapper=document.getElementById('id-slider-wrapper');
  if (!(wrapper=== null)) {
    var size=wrapper.clientWidth;
    wrapper.children[0].style.width=''+size+'px';
    wrapper.children[1].style.width='0';
  }
}

function viewAfter() {
  var wrapper=document.getElementById('id-slider-wrapper');
  if (!(wrapper=== null)) {
    var size=wrapper.clientWidth;
    wrapper.children[0].style.width='0';
    wrapper.children[1].style.width=''+size+'px';
    wrapper.children[1].children[0].lastElementChild.style.left='0';
  }
}

// карта -----------------------------------------------
var mapIFrame = document.getElementById('id-map-iframe');
var mapImg = document.getElementById('id-map-image');
var mapLinks = document.querySelectorAll('.js__link');

if (!(mapLinks === null) && !(mapIFrame === null)  && !(mapImg === null))  {

  for (var i = 0; i < mapLinks.length; i++) {
    mapLinks[i].onselectstart = function(e) {
      e.preventDefault();
    }

    mapLinks[i].addEventListener('dblclick', function (e) {
      e.preventDefault();
      mapIFrame.classList.toggle('map__image--hide');
      mapIFrame.classList.toggle('map__image--show');
      mapImg.classList.toggle('map__image--hide');
      mapImg.classList.toggle('map__image--show');
    });
  }
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
