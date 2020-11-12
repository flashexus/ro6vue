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