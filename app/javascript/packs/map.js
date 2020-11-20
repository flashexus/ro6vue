window.jQuery = $
window.$      = $
import 'leaflet'
import resizeArea from "../maps/resizeArea"
import LJyosetuMap from "../maps/l_jyosetu_map"
import "leaflet/dist/leaflet.css";
require('jquery')

var jyosetuMap = new LJyosetuMap(); 
var options = {'mouseover': false, 'popup_of_min': false, 'switch_map': true};
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
  gon.points.forEach(element => {
    jyosetuMap.addSpotMarker([element["lon"],element["lat"]],gon.icon[element["shop_type"]],element["name"]);
  });

  //表示位置合わせ
  if (lonlat[0] !== null && lonlat[1] !== null && zoom !== null) {
    jyosetuMap.setView(lonlat, zoom);
  } else {
    jyosetuMap.fitBounds();
  }
}
  //////////////////////////////////////初期表示//////////////////////////////////////
$('#inputGroupSelect01').change(function(){
  let area = $(this).val();
  jyosetuMap.setView(gon.area_pos[area], zoom);
  return;
})

//////////////////////////////////////現在位置表示//////////////////////////////////////
$('#getPosbtn01').on('click',function(){
  navigator.geolocation.getCurrentPosition(test2);
})
function test2(position) {
  lonlat[0] = position.coords.longitude;
  lonlat[1] = position.coords.latitude;

  jyosetuMap.setView(lonlat, zoom);
}