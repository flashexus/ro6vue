import 'jsqr';
require('jquery')
//////////////////////////////////////QR読み取り//////////////////////////////////
document.querySelector("#flame").addEventListener("click", () => {
  const flame = document.querySelector("#flame");
  const canvas = document.querySelector("#canvas");
  const video = document.querySelector("#camera");
  const ctx = canvas.getContext("2d");
  // カメラ設定
  const constraints = {
    audio: false,
    video: {
      width: canvas.width,
      height: canvas.height,
      facingMode: "environment"
    }
  };
  //safariに対応するためにはvideoタグをhiddenにできないためサイズを調整して対応
  // video.hidden = false;
  video.height = 200;
  flame.hidden = true;
  const drawLine = (ctx, pos, options={color:"blue", size:5})=>{
    // 線のスタイル設定
    ctx.strokeStyle = options.color;
    ctx.lineWidth   = options.size;

    // 線を描く
    ctx.beginPath();
    ctx.moveTo(pos.topLeftCorner.x, pos.topLeftCorner.y);
    ctx.lineTo(pos.topRightCorner.x, pos.topRightCorner.y);
    ctx.lineTo(pos.bottomRightCorner.x, pos.bottomRightCorner.y);
    ctx.lineTo(pos.bottomLeftCorner.x, pos.bottomLeftCorner.y);
    ctx.lineTo(pos.topLeftCorner.x, pos.topLeftCorner.y);
    ctx.stroke();
  }
  const checkPicture = ()=>{
    canvas.hidden = false;
    video.height = 1;
    video.weight = 1;
    // video.hidden = true;
    // 映像をCanvasへ
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // QRコード読取
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, canvas.width, canvas.height);
    if( code ){
      // 存在する場合
      // 結果を表示
      drawLine(ctx, code.location);       // 見つかった箇所に線を引く
      // video と canvas を入れ替え
      canvas.style.display = 'block';
      video.style.display = 'none';
      video.pause();

      set_csrftoken();
	    $.ajax({ type: 'POST', url: '/stamps',
               data: ('point_id='+code.data), dataType: 'json' 
            }).done(function(data){
              if(data.message =='BINGO'){
                location.href="/stamps?get=bingo";
              }else{
                location.href="/stamps?get=stamp";
              }
            }).fail(function(data){
              alert(data.responseText);  // 取得した文字列
              location.href="/stamps/new";
            });
    } else{
      // 存在しない場合
      // 0.3秒後にもう一度チェックする
      setTimeout( () => {
        checkPicture();
      }, 300);
    }
  }
  // カメラを video と同期
  navigator.mediaDevices.getUserMedia(constraints)
  .then( (stream) => {
    video.srcObject = stream;
    video.onloadedmetadata = (e) => {
      video.play();
      // QRコードのチェック開始
      checkPicture();
    };
  })
  .catch( (err) => {
    console.log(err.name + ": " + err.message);
  });
});

function set_csrftoken() {
  $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
      if (!options.crossDomain) {
          const token = $('meta[name="csrf-token"]').attr('content');
          if (token) {
              return jqXHR.setRequestHeader('X-CSRF-Token', token);
          }
      }
  });
}