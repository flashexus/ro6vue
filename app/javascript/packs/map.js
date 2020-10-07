window.jQuery = $
window.$      = $
import 'leaflet'
import resizeArea from "../maps/resizeArea"
import LJyosetuMap from "../maps/l_jyosetu_map"
import "leaflet/dist/leaflet.css";
require('jquery')

window.onload = function(){
  "use strict";
  // 読み込み時に地図のサイズを画面に合わせる
  resizeArea();

  // ウィンドウリサイズ時に地図のサイズを画面に合わせる
  $(window).resize(resizeArea);
  var jyosetuMap = new LJyosetuMap(); 
  var options = {'mouseover': false, 'popup_of_min': false, 'switch_map': true};
  var lonlat = [gon.area_pos["石央エリア"][1],gon.area_pos["石央エリア"][0]];
  var zoom = 14;
  jyosetuMap.create('map', lonlat, options);

  //スポット表示
  gon.points.forEach(element => {
    console.log(element);
    jyosetuMap.addSpotMarker([element["lon"],element["lat"]],gon.icon[element["shop_type"]]);
  });

    //表示位置合わせ
    if (lonlat[0] !== null && lonlat[1] !== null && zoom !== null) {
      jyosetuMap.setView(lonlat, zoom);
    } else {
      jyosetuMap.fitBounds();
    }
  
}
