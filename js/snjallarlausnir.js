/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$("#contactForm").submit(function(){
    return false;
});

$(function () { $("input,select,textarea").not("[type=submit]").jqBootstrapValidation(
    {
    preventSubmit: true,
    submitSuccess: function ($form, event) {
        var xhr = $.ajax({
        type: 'POST',
        url: "https://mandrillapp.com/api/1.0/messages/send.json",
        dataType: 'json',
        data: {
            key: 'HknuMOc39IjrkAv9-D-gTw',
            message: {
            text: $("#email_content").val() + "\n\n" + $("#name").val() + " - Sími:" + $("#phone").val(),
            subject: "Fyrirspurn - " + $("#name").val(),
            from_email: $("#email").val(),
            from_name: $("#name").val(),
            to: [{
                    "email": "snjallarlausnir@gmail.com",
                    "name": $("#name").val()
                }]
            }
        }
        });
        $("#email_send").attr("disabled",true);
        $("#email_send").html("...");

        xhr.done(function(data) {
            $('#console').append(JSON.stringify(data));
            bootbox.alert("Takk fyrir að hafa samband, við munum svara þér eins fljótt og auðið er");
            $('#contactForm')[0].reset();
            $("#email_send").attr("disabled",false);
            $("#email_send").html("Senda");
        });

        xhr.fail(function(jqXHR, textStatus, errorThrown) {
            $('#console').append(jqXHR.responseText);
        });
    }
    }
)});

