
window.jQuery = $
window.$      = $
import 'leaflet'
import resizeArea from "../maps/resizeArea"
import LJyosetuMap from "../maps/l_jyosetu_map"
import "leaflet/dist/leaflet.css";
require('jquery')
window.alert(`hello,${gon.user.username}!`); 
window.onload = function(){
  "use strict";
  // 読み込み時に地図のサイズを画面に合わせる
  resizeArea();

  // ウィンドウリサイズ時に地図のサイズを画面に合わせる
  $(window).resize(resizeArea);
  var jyosetuMap = new LJyosetuMap(); 
  var options = {'mouseover': false, 'popup_of_min': false, 'switch_map': true};
  var lonlat = [132.76488304138184, 35.38405443308128]; // VL
  var zoom = 14;
  jyosetuMap.create('map', lonlat, options);

  if (lonlat[0] !== null && lonlat[1] !== null && zoom !== null) {
    jyosetuMap.setView(lonlat, zoom);
} else {
    jyosetuMap.fitBounds();
}
  
}
