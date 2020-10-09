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

window.onload = function(){
  "use strict";
  // 読み込み時に地図のサイズを画面に合わせる
  resizeArea();

  // ウィンドウリサイズ時に地図のサイズを画面に合わせる
  $(window).resize(resizeArea);
  jyosetuMap.create('map', lonlat, options);

  //スポット表示
  gon.points.forEach(element => {
    console.log(element);
    jyosetuMap.addSpotMarker([element["lon"],element["lat"]],gon.icon[element["shop_type"]],element["name"]);
  });

    //表示位置合わせ
    if (lonlat[0] !== null && lonlat[1] !== null && zoom !== null) {
      jyosetuMap.setView(lonlat, zoom);
    } else {
      jyosetuMap.fitBounds();
    }
  
}

$('#inputGroupSelect01').change(function(){
  let area = $(this).val();
  console.log(gon.area_pos[area]);
  jyosetuMap.setView(gon.area_pos[area], zoom);
  return;
})

$('#getPosbtn01').on('click',function(){
  navigator.geolocation.getCurrentPosition(test2);
})
function test2(position) {

  var geo_text = "緯度:" + position.coords.latitude + "\n";
  geo_text += "経度:" + position.coords.longitude + "\n";
  geo_text += "高度:" + position.coords.altitude + "\n";
  geo_text += "位置精度:" + position.coords.accuracy + "\n";
  geo_text += "高度精度:" + position.coords.altitudeAccuracy  + "\n";
  geo_text += "移動方向:" + position.coords.heading + "\n";
  geo_text += "速度:" + position.coords.speed + "\n";

  var date = new Date(position.timestamp);

  geo_text += "取得時刻:" + date.toLocaleString() + "\n";

  alert(geo_text);

}