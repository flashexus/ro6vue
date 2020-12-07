
require('bootstrap/dist/js/bootstrap');
///////////////////////////////////window on load////////////////////////////////////////////
var stampPopupBg = document.getElementById("stampPopupBg");
var getPopuoImg1 = document.getElementById("getPopuoImg1");
var getPopuoImg2 = document.getElementById("getPopuoImg2");

//パラメータに応じて表示させるポップアップを変更
window.onload = function(){
  var parm =  location.search.split('=');
  if( parm[1] == "bingo" ){
    stampPopupBg.hidden = false;
    getPopuoImg2.hidden = false;
  }else{
    if(parm[1] == "stamp"){
      stampPopupBg.hidden = false;
      getPopuoImg1.hidden = false;
    }
  }
  
  //スタンプカード獲得時のid番号に
  //BootStrapのツールチップを使用するために必要
  $('[data-toggle="tooltip"]').tooltip();
}

///////////////////////////////////get stamp////////////////////////////////////////////
//スタンプを取得すると他のボタンを押せなくなるため必要
document.querySelector("#getStampBtn1").addEventListener("click", () => {
  stampPopupBg.hidden = true;
  getPopuoImg1.hidden = true;
});
document.querySelector("#getStampBtn2").addEventListener("click", () => {
  stampPopupBg.hidden = true;
  getPopuoImg2.hidden = true;
});
document.getElementById("stampPopupBg").addEventListener("click", () => {
  stampPopupBg.hidden = true;
  getPopuoImg1.hidden = true;
  getPopuoImg2.hidden = true;
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
