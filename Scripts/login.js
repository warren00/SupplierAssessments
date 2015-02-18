(function (S) {

    $.fn.login = function (url) {

        var loginButton = $("button", $(this));

        Ladda.bind('.ladda-button');

        $(":input[type=password]", $(this)).keypress(function (e) {
            if (e.which == 13) // enter key code
            {
                loginButton.click();

                $('input:focus').blur();

                event.preventDefault();
            }
        });

        loginButton.on('click touch', function () {

            $('.failure-text').text('');

            setTimeout(function () { login(); }, 1000);

            function login() {
                var request =
                    {
                        username: $('#Username').val(),
                        password: $('#Password').val(),
                        rememberMe: $("#rememberMe").prop("checked")
                    };

                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: url,
                    headers: { 'Content-Type': 'application/json' },
                    data: JSON.stringify(request)
                }).success(function (data) {
                    if (data.isAuthorized) {
                        document.location = '/'
                    }
                    else {
                        $('.failure-text').text(data.message);
                        Ladda.stopAll();
                    }
                }).fail(function (jqXHR, textStatus) {
                    if (textStatus == "error" && jqXHR.status == 0) {
                        Ladda.stopAll();
                        $('.failure-text').text("No data connection");
                    }
                });
            }
        });

        $.fn.toggleDiv = function (options) {

            var link = $(this);

            var mainDiv = $(options.main);
            var targetDiv = $(options.target);

            var close = $('.div-toggle', targetDiv)

            link.click(function () {
                mainDiv.fadeOut("slow", function () {
                    targetDiv.fadeIn();

                    $(".ladda-button .ladda-spinner", targetDiv).remove();
                    Ladda.bind('.ladda-button');
                })

                $(".ladda-button .ladda-spinner", targetDiv).remove();
            });

            close.click(function () {
                targetDiv.fadeOut(function () {
                    mainDiv.fadeIn();

                    $(".ladda-button .ladda-spinner", targetDiv).remove();
                    Ladda.bind('.ladda-button');
                });

                $(".ladda-button .ladda-spinner", mainDiv).remove();
            });
        }
    }

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    $.fn.form = function (options) {

        var form = $(this);

        $(":input[type=text], :input[type=email]", form).blur(function (event) {
            if ($(this).attr('required') && $(this).val() == '') {

                $(this).parent(".form-group").removeClass("has-success");
                $(this).parent('.form-group').addClass('has-error');

                $('.fail', $(this).parent('.form-group')).css('display', 'block');
                $('.success', $(this).parent('.form-group')).css('display', 'none');
            }
            else {
                $(this).parent(".form-group").removeClass("has-error");
                $(this).parent('.form-group').addClass('has-success');

                $('.fail', $(this).parent('.form-group')).css('display', 'none');
                $('.success', $(this).parent('.form-group')).css('display', 'block');
            }
        });

        $(":input[type=email]", form).blur(function (event) {
            if (!validateEmail($(this).val())) {
                $(this).parent(".form-group").removeClass("has-success");
                $(this).parent('.form-group').addClass('has-error');

                $('.fail', $(this).parent('.form-group')).css('display', 'block');
                $('.success', $(this).parent('.form-group')).css('display', 'none');
            }
            else {
                $(this).parent(".form-group").removeClass("has-error");
                $(this).parent('.form-group').addClass('has-success');

                $('.fail', $(this).parent('.form-group')).css('display', 'none');
                $('.success', $(this).parent('.form-group')).css('display', 'block');
            }
        });

        $(":input[type=text], :input[type=email]").keypress(function (e) {
            if (e.which == 13) // enter key
                $(this).blur();
        });

        $("button", $(this)).click(function () {
            var processRequest = true;

            $(":input[type=text], :input[type=email]", form).each(function () {
                if ($(this).attr('required') && $(this).val() == '') {
                    $(this).parent(".form-group").removeClass("has-success");
                    $(this).parent('.form-group').addClass('has-error');

                    $('.fail', $(this).parent('.form-group')).css('display', 'block');
                    $('.success', $(this).parent('.form-group')).css('display', 'none');

                    processRequest = false;
                }
                else {
                    $(this).parent(".form-group").removeClass("has-error");
                    $(this).parent('.form-group').addClass('has-success');

                    $('.fail', $(this).parent('.form-group')).css('display', 'none');
                    $('.success', $(this).parent('.form-group')).css('display', 'block');
                }
            });

            $(":input[type=email]", form).each(function () {
                if (!validateEmail($(this).val())) {
                    $(this).parent(".form-group").removeClass("has-success");
                    $(this).parent('.form-group').addClass('has-error');

                    $('.fail', $(this).parent('.form-group')).css('display', 'block');
                    $('.success', $(this).parent('.form-group')).css('display', 'none');

                    processRequest = false;
                }
                else {
                    $(this).parent(".form-group").removeClass("has-error");
                    $(this).parent('.form-group').addClass('has-success');

                    $('.fail', $(this).parent('.form-group')).css('display', 'none');
                    $('.success', $(this).parent('.form-group')).css('display', 'block');
                }
            });

            if (processRequest) {
                var url = options.url;
                var request = options.request();

                $.ajax({
                    type: 'post',
                    dataTyoe: 'json',
                    url: url,
                    headers: { 'Content-Type': 'application/json' },
                    data: JSON.stringify(request)
                }).success(function (data) {
                    setTimeout(function () {
                        $(".div-toggle", form).click();
                        Ladda.stopAll();
                    }, 1000);
                });
            }
            else {
                setTimeout(function () {
                    Ladda.stopAll();
                }, 1000);
            }
        });
    }

}(jQuery));

$(document).ready(function () {
    $("#LoginForm").login("https://supplierassessment6729.azurewebsites.net/api/account/login");

    $(".register-link").toggleDiv({ main: '#LoginForm', target: '.register-form' });
    $(".forgot-password-link").toggleDiv({ main: '#LoginForm', target: '.lost-password-form' });

    $(".register-form").form({
        url: "/api/account/SendRegisterRequest",
        request: function () {
            return {
                company: $('#registerCompany').val(),
                accountNumber: $('#registerAccountNumber').val(),
                email: $('#registerEmailAddress').val()
            }
        }
    });

    $(".lost-password-form").form({
        url: "/api/account/SendForgotPasswordRequest",
        request: function () {
            return {
                accountNumber: $('#lostPasswordAccountNumber').val(),
                email: $('#lostPasswordEmailAddress').val(),
                username: $('#lostPasswordUsername').val(),
            }
        }
    })
});