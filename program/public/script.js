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

//mainモーダル（ログイン・新規登録）
// $(function() {
    $('#login-show').click(function() {
      $('#login-modal').fadeIn();
    });
    
    $('#signup-show').click(function(){
      $('#signup-modal').fadeIn();
    })
// });
  