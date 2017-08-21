$(document).ready(function () {
    $('#message-form').submit(function (event) {
        event.preventDefault();
        var textarea = $('#message');
        var message = $.trim(textarea.val());
        if (message.length !== 0) {
            document.getElementById('message').value = "";
            textarea.focus();
            $.ajax({
                method: 'POST',
                url: '/send/',
                data: {
                    'msg': message
                },
                cache: false,
                success: function () {
                    console.log("Message sent.");
                },
                error: function () {
                    alert("Error occured.");
                }
            });
        }
    });
    $('#message').keypress(function(event){
      if(event.keyCode === 13) {
          event.preventDefault();
          var textarea = $('#message');
          var message = $.trim(textarea.val());
          if (message.length !== 0) {
              $('#send').click();
          }
      }
    });
});