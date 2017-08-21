$(document).ready(function () {
    setInterval(check_for_new_msgs, 100);
    var msgs_amount = 0;
    function check_for_new_msgs() {
        $.ajax({
            method: 'get',
            url: '/send/',
            data: {'msgs_amount': msgs_amount},
            cache: false,
            success: function (response) {
                console.log("Requested amount: '" + response.amount + "' has been got.");
                if (response.amount !== msgs_amount) {
                    refresh_msg_box();
                }
            },
            error: function () {
                console.log("Error occurred while getting message.");
            }
        });
    }
    function refresh_msg_box() {
        var scroll_chatlogs = $('.chatlogs');
        $.getJSON('/displayMsgs', function (response) {
            console.log(response);
            msgs_amount = response.length;
            var html = "";
            for (var key in response) {
                html += js_object_to_html(key, response);
            }
            document.getElementById('messages').innerHTML = html;
            scroll_chatlogs.scrollTop(scroll_chatlogs.prop("scrollHeight"));
        })
    }
    function js_object_to_html(key, response) {
        var html;
        var current_user = global_var_current_user;
        if (current_user === response[key].author) {
            html = '<div class="chat self">';
            if (response[key].author_logo) {
                html += '<a href="/messenger/user/id' + response[key].author_id + '/"><div class="user-photo" style="background-image: url(' + response[key].author_logo + ')"></div></a>';
            }
            else {
                html += '<a href="/messenger/user/id' + response[key].author_id + '/"><div class="user-data"><p>' + response[key].author_fn_ln + '</p></div></a>';
            }
            html += '<div class="chat-message">';
            html += '<p class="msg">' + response[key].msg + '</p>';
            html += '<p class="msg-time">' + response[key].time + '</p>';
            html += '</div>';
            html += '</div>';
        }
        else {
            html = '<div class="chat friend">';
            if (response[key].author_logo) {
                html += '<a href="/messenger/user/id' + response[key].author_id + '/"><div class="user-photo" style="background-image: url(' + response[key].author_logo + ')"></div></a>';
            }
            else {
                html += '<a href="/messenger/user/id' + response[key].author_id + '/"><div class="user-data"><p>' + response[key].author_fn_ln + '</p></div></a>';
            }
            html += '<div  class="chat-message">';
            html += '<p class="msg">' + response[key].msg + '</p>';
            html += '<p class="msg-time">' + response[key].time + '</p>';
            html += '</div>';
            html += '</div>';
        }
        return html;
    }
    $('.chatlogs').scroll(function() {
        if ($('.chatlogs').scrollTop() === 0) {
            console.log("Scrtolled to the top!");
        }
    });
});



