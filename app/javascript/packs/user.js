require('jquery')
////////////////////////////////////郵便番号検索///////////////////////////////////
document.querySelector("#get_address").addEventListener("click", () => {
  var zipcode =  $('#txtZipCode').val();
  console.log(zipcode);

  $.ajax({ type: 'GET', url: 'https://zipcloud.ibsnet.co.jp/api/search',
      data: ('zipcode='+ zipcode), dataType: 'jsonp' 
    }).done(function(data){
     $('#entry_address_addr').val(data.results[0]["address1"] + data.results[0]["address2"]) ;
    }).fail(function(data){
      alert(data.responseText);  // 取得した文字列
    });
});