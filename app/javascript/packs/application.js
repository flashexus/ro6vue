// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

require('jquery');
import 'bootstrap';
import '@fortawesome/fontawesome-free/js/all'
import '../stylesheets/application';
import '../stylesheets/custom';

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

//ブラウザキャッシュ対策（for chrome）
//bfcacheの状態に影響されずリロードするためのおまじない
window.onunload = function() {
  // IE以外用。ここは空でOKです
};
//ブラウザキャッシュ対策（for safari）
window.addEventListener("pageshow", function(event){
  if (event.persisted) {
    // ここにキャッシュ有効時の処理を書く
    window.location.reload();
  }
});
var userAgent = window.navigator.userAgent.toLowerCase();
var browerType = judgeBrowserType(userAgent);
var deviceType = judgeDeviceType(userAgent);

//bfcacheの状態によっては変数の更新がうまくされないケースがあるということで
//キャッシュクリア対策には変数での判定は行わない
if ( deviceType == 'iPhone' && browerType != 'Safari' ) {
  alert('iPhoneをお使いの方はSafariからアクセスしてください');
}
if ( deviceType == 'Android' && browerType != 'Chrome' ) {
  alert('Androidをお使いの方はChromeからアクセスしてください');
}

///////////////////////////////////////////////////////////////////////////////
// ユーザーエージェントからブラウザタイプを判定
function judgeBrowserType(UserAgent){
  if(UserAgent.indexOf('msie') != -1 ||
  UserAgent.indexOf('trident') != -1) {
    return 'IE';
  } else if(UserAgent.indexOf('edge') != -1) {
      return 'Edge';
  } else if(UserAgent.indexOf('chrome') != -1) {
      return 'Chrome';
    } else if(UserAgent.indexOf('crios') != -1) {
      return 'Chrome';
    } else if(UserAgent.indexOf('safari') != -1) {
      return 'Safari';
  } else if(UserAgent.indexOf('firefox') != -1) {
      return 'FireFox';
  } else if(UserAgent.indexOf('opera') != -1) {
      return 'Opera';
  } else {
      return null;
  }
}
// ユーザーエージェントからブラウザタイプを判定
function judgeDeviceType(UserAgent){
  if(UserAgent.indexOf('iphone') != -1) {
    return 'iPhone';
  } else if(UserAgent.indexOf('ipad') != -1) {
    return 'iPad';
  } else if(UserAgent.indexOf('android') != -1) {
    if(UserAgent.indexOf('mobile') != -1) {
      //アンドロイド スマフォの場合
      return 'Android';
    } else {
      //アンドロイド タブレットの場合
      return 'Android';
    }
  }
}