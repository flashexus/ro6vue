require('jquery')
////////////////////////////////////(新規登録)郵便番号検索///////////////////////////////////
document.querySelector("#get_address").addEventListener("click", () => {
  var zipcode =  $('#txtZipCode').val();
  console.log(zipcode);

  $.ajax({ type: 'GET', url: 'https://zipcloud.ibsnet.co.jp/api/search',
      data: ('zipcode='+ zipcode), dataType: 'jsonp' 
    }).done(function(data){
      if(data.status == 200){
        $('#address').val(data.results[0]["address1"] + data.results[0]["address2"]) ;
      }else{
        alert("検索失敗：直接住所を入力してください"); 
      }
    }).fail(function(data){
      alert("検索失敗：直接住所を入力してください"); 
    });
});