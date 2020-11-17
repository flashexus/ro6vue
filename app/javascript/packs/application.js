// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

import 'bootstrap';
import '@fortawesome/fontawesome-free/js/all'
import '../stylesheets/application';
import '../stylesheets/custom';

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

//メニュー表示
$(function(){
  var modalBtn = $('.vl-modalBtn');
  var modalBtnClose = $('.vl-modalBtnClose');
  var modalBtnCloseFix = $('.vl-modalBtnCloseFix');
  var modalBg = $('.vl-modalBg');
  var modalMain = $('.vl-modalMain');
  modalBtn.on('click', function (e) {
    $(this).next(modalBg).fadeIn();
    $(this).next(modalBg).next(modalMain).removeClass("_slideDown");
    $(this).next(modalBg).next(modalMain).addClass("_slideUp");
  });
  modalBtnClose.on('click', function (e) {
    modalBg.fadeOut();
    modalMain.removeClass("_slideUp");
    modalMain.addClass("_slideDown");
  });
  modalBtnCloseFix.on('click', function (e) {
    modalBg.fadeOut();
    modalMain.removeClass("_slideUp");
    modalMain.addClass("_slideDown");
  });
  modalMain.on('click', function (e) {
    e.stopPropagation();
  });
  modalBg.on('click', function () {
    $(this).fadeOut();
    $(this).next(modalMain).removeClass("_slideUp");
    $(this).next(modalMain).addClass("_slideDown");
  });
});


// スタンプゲット時サンプル用
$(function() {
  $('.vl-closeOnImg').click(function() {
    $('.vl-stampPopupBg').addClass('none'); 
  }); 
 
  $('.vl-stampPopupBg').click(function() {
    $(this).addClass('none'); 
    $('.vl-getPopuoImg').addClass('none'); 
  }); 
});