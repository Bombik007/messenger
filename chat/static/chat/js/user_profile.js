$(document).ready(function () {
    $('#btn-save-logo').attr('disabled', true);
    $('#btn-save-bg').attr('disabled', true);
    var hide_show_btn = $('#hide-show-user-profile-info');
    var hide_show_content = $('.content');
    hide_show_btn.click(function () {
        if (hide_show_content.is(':visible')) {
            hide_show_btn.val("Show user info");
            hide_show_content.hide(400);
        }
        else {
            hide_show_btn.val("Hide user info");
            hide_show_content.show(400);
        }
    });
    function readURL(input, upload_to) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                $(upload_to).attr({
                    'display': 'block',
                    'src': event.target.result,
                    'width': '70%',
                    'height': 'auto'
                });
                $(upload_to).addClass('uploaded-photo');
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#img-input-logo").change(function(){
        readURL(this, '#uploaded-photo-logo');
        $('#btn-save-logo').attr('disabled', false);
    });
    $("#img-input-bg").change(function(){
        readURL(this, '#uploaded-photo-bg');
        $('#btn-save-bg').attr('disabled', false);
    });
    var photo_logo = $('.photo-logo');
    photo_logo.mouseover(function () {
        $('.logo').css('display', 'block');
    });
    photo_logo.mouseout(function () {
        $('.logo').css('display', 'none');
    });
    var photo_bg = $('.photo-bg');
    photo_bg.mouseover(function () {
        $('.background').css('display', 'block');
    });
    photo_bg.mouseout(function () {
        $('.background').css('display', 'none');
    });
    $('#send-message-btn').click(function () {
        var chat_room_data = this.name;
        var msg = $.trim($('#msg-area').val());
        if (msg.length !== 0) {
            $.ajax({
                method: 'POST',
                url: '/createchat/',
                data: {
                    'create_chat_room': chat_room_data,
                    'msg': msg
                },
                cache: false,
                success: function (response) {
                    console.log(response.message);
                },
                error: function () {
                    console.log("Error occurred while sending message.");
                }
            });
        }
        else {
            $.ajax({
                method: 'POST',
                url: '/createchat/',
                data: {
                    'create_chat_room': chat_room_data
                },
                cache: false,
                success: function (response) {
                    console.log(response.message);
                },
                error: function () {
                    console.log("Error occurred while sending message.");
                }
            });
        }
    });
    $('#msg-area').keypress(function(event){
      if(event.keyCode === 13) {
          event.preventDefault();
          var textarea = $('#msg-area');
          var message = $.trim(textarea.val());
          if (message.length !== 0) {
              $('#send-message-btn').click();
          }
      }
    });
});