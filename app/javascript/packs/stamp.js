
require('bootstrap/dist/js/bootstrap');
///////////////////////////////////window on load////////////////////////////////////////////
var stampPopupBg = document.getElementById("stampPopupBg");
var getPopuoImg = document.getElementById("getPopuoImg");

window.onload = function(){
  var parm =  location.search.split('=');
  if( parm[1] == "true" ){
    stampPopupBg.hidden = false;
    getPopuoImg.hidden = false;
  }
  $('[data-toggle="tooltip"]').tooltip();
}

///////////////////////////////////get stamp////////////////////////////////////////////
//スタンプを取得すると他のボタンを押せなくなるため必要
document.querySelector("#getStampBtn").addEventListener("click", () => {
  stampPopupBg.hidden = true;
  getPopuoImg.hidden = true;
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
