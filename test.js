$(document).ready(function () {
    $('#test').on('submit', (e) => {
        e.preventDefault();
        $.ajax({
            url: `http://localhost:6969/api/image/post_image_content/9`,
            method: 'POST',
            success: function() {
                console.log('Success');
                window.location.href = google.com;
            },
            error: function (result) {
                console.log(JSON.stringify(result));
            }
        });
    });
});
