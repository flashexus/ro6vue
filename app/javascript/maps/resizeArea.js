export default function resizeArea() {
    // 地図サイズとサイドバーを画面サイズに合わせる
    var h = $(window).height() - ($('#resize_area').offset().top)/2;
    $('#resize_area').css('height', h + 'px');
    $('#map').css('height', '100%');
}


