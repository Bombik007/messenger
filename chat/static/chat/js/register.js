$(document).ready(function () {
    document.getElementById('id_first_name').required = true;
    document.getElementById('id_first_name').placeholder = "First name";
    document.getElementById('id_last_name').required = true;
    document.getElementById('id_last_name').placeholder = "Last name";
    document.getElementById('id_email').required = true;
    document.getElementById('id_email').placeholder = "Email";
    document.getElementById('id_password').placeholder = "Password";
    document.getElementById('id_username').placeholder = "Username";

    var generated_code;
    $('#register').click(function register() {
        var received_code = document.getElementById('received-code');
        if (!received_code.value) {
            $('#received-code-content').show(400);
            document.getElementById('content-register').style.height = "850px";
            generated_code = Math.random().toString(36).slice(2);
            send_code(
                generated_code,
                document.getElementById('id_email').value,
                document.getElementById('id_password').value,
                document.getElementById('id_username').value);
        }
    });
    function send_code(code, email, password, username) {
        $.ajax({
                method: 'GET',
                url: '/send_email/',
                dataType: 'json',
                data: {
                    generated_code: code,
                    user_email: email,
                    password: password,
                    username: username
                },
                cache: false,
                success: function (response) {
                    console.log("Code for verification has been sent successfully!");
                    if (response.error_code === "222") {
                        alert("Error message: " + response.name);
                        $('#received-code-content').hide();
                    }
                },
                error: function () {
                    alert("Error occurred while sending code for verification!");
                }
        });
    }
});