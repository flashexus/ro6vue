import 'jsqr';
require('jquery')
///////////////////////////////////////////////////////////////////////////////
//メニュー表示用
//$(window).on('load', function(){
  var menu = $('.vl-menu');
  var modalBg = $('.vl-modalBg');
  var modalMain = $('.vl-modalMain');
  //メニュー開く
  menu.on('click','.vl-modalBtn',function (e) {
    $(this).next(modalBg).fadeIn();
    $(this).next(modalBg).next(modalMain).removeClass("_slideDown");
    $(this).next(modalBg).next(modalMain).addClass("_slideUp");
  });
  //メニュー閉じ
  menu.on('click','.vl-modalBtnClose',function (e) {
    modalBg.fadeOut();
    modalMain.removeClass("_slideUp");
    modalMain.addClass("_slideDown");
  });
  //モーダル展開
  menu.on('click','.vl-modalMain',function (e) {
    e.stopPropagation();
  });
  //モーダル背景
  menu.on('click','.vl-modalBg',function (e) {
    $(this).fadeOut();
    $(this).next(modalMain).removeClass("_slideUp");
    $(this).next(modalMain).addClass("_slideDown");
  });
// });
