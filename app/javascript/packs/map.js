window.jQuery = $
window.$      = $
import 'leaflet';
import resizeArea from "../maps/resizeArea";
import LJyosetuMap from "../maps/l_jyosetu_map";
import "leaflet/dist/leaflet.css";
require('jquery')

var jyosetuMap = new LJyosetuMap();
var options = {'mouseover': false, 'popup_of_min': false, 'switch_map': false};
var lonlat = gon.area_pos["石央エリア"];
var zoom = 14;

  //////////////////////////////////////初期表示//////////////////////////////////////
window.onload = function(){
  "use strict";
  // 読み込み時に地図のサイズを画面に合わせる
  resizeArea();

  // ウィンドウリサイズ時に地図のサイズを画面に合わせる
  $(window).resize(resizeArea);
  jyosetuMap.create('map', lonlat, options);

  //スポット表示
  jyosetuMap.addAreaSpotMarker(gon.select_area,gon.points,gon.icon);
  //表示位置合わせ
  jyosetuMap.areafitBounds();
  //初期エリア選択
  $('#item2-tab').attr('aria-selected',true);
  $('#item2-tab').addClass('active');
}
//////////////////////////////////////エリア選択表示//////////////////////////////////////
$('.nav-link').on('click', function () {
  //エリア名の抽出
  gon.select_area = this.textContent.trim();
  //表示中のスポットを削除
  jyosetuMap.removeAreaSpotMarker();
  //選択エリアに合わせたスポットを表示
  jyosetuMap.addAreaSpotMarker(gon.select_area,gon.points,gon.icon);
  //表示位置の調整
  jyosetuMap.areafitBounds();
  updateTable(gon.select_area);
});

//////////////////////////////////////施設名の選択//////////////////////////////////////
// 車両名のクリック
//(DOMがajaxで動的に生成されるため、$(#change).onでバインドする必要有)
$('#change').on('click','.shop_label' ,function () {
  // 車両にズーム
  var shop_name = this.textContent.trim();
  var shop_label_options = {'zoom': false, 'pan': false};
  jyosetuMap.clickShopLabel(shop_name, shop_label_options);
});

//////////////////////////////////////現在位置表示////////////////////////////////////////
$('.vl-currentPosition').on('click','#getPosbtn01',function(){
  navigator.geolocation.getCurrentPosition(SetCrtPosMarker);
})
function SetCrtPosMarker(position) {
  var CrtPoslonlat = [];
  CrtPoslonlat[0] = position.coords.longitude;
  CrtPoslonlat[1] = position.coords.latitude;
  jyosetuMap.removeMySpotMarker();
  jyosetuMap.addMySpotMarker(CrtPoslonlat,gon.icon["セルフ"],"現在位置");
  jyosetuMap.setView(CrtPoslonlat, zoom);
}
/////////////////////////////////////////////////////////////////////////////////////////
function updateTable(area) {
  $.get({
    url:"/points/area_shop" ,
    data: {
      area:area
    }
  }).done(function(data) {
      $("#change").html(data);
  })
}


