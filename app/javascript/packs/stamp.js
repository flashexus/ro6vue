
require('bootstrap/dist/js/bootstrap');
///////////////////////////////////window on load////////////////////////////////////////////
//パラメータに応じて表示させるポップアップを変更
//window.onload = function(){
  var parm =  location.search.split('=');
  if( parm[1] == "stamp" ){
    $('#stampPopupBg').attr('hidden',false);
    $('#getPopuoImg1').attr('hidden',false);
  }
  if( parm[1] == "bingo" ){
    $('#stampPopupBg').attr('hidden',false);
    $('#getPopuoImg2').attr('hidden',false);
  }

  //スタンプカード獲得時のid番号に
  //BootStrapのツールチップを使用するために必要
  $('[data-toggle="tooltip"]').tooltip();
//}

///////////////////////////////////get stamp////////////////////////////////////////////
//スタンプを取得すると他のボタンを押せなくなるため必要
//スタンプ閉じるとき(×ボタン)
//$(function() {
  $('.vl-stamp').on('click','.vl-closeOnImg',function () {
    $('#stampPopupBg').attr('hidden',true);
    $('#getPopuoImg1').attr('hidden',true);
    $('#getPopuoImg2').attr('hidden',true);
  });
//スタンプ閉じるとき(背景タップ)
  $('.vl-stamp').on('click','.vl-stampPopupBg',function () {
    $(this).addClass('none');
    $('#stampPopupBg').attr('hidden',true);
    $('#getPopuoImg1').attr('hidden',true);
    $('#getPopuoImg2').attr('hidden',true);
  });
//});
