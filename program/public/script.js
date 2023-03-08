//jQuery用
//startpageモーダル
var access = $.cookie('access')
if(!access){
    flag = true;
    $.cookie('access', false);
}else{
    flag = false;
}

$('.modal-open').modaal({
    start_open: flag,
    overlay_close: true,
    before_open: function(){
        $('html').css('overflow-y', 'hidden');
    },
    after_close:function(){
        $('html').css('overflow-y', 'scroll');
    }
});

// //reccomendpageカーソルあわせ//うまく作動しない。-> hoverアニメーションはcssで対応。
// $(function(){
//     $('.card-img-top').hover(
//         function(){
//             $('.card-img-top').css('opacity', '0.5' )
//         },
//         function(){
//             $('.card-img-top').css('opacity', '1' )       
//         }
//     )
// });