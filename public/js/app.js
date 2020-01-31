$(function () {
    $(`form.login`).on(`submit`, e => {
        e.preventDefault();
        let userData = {
            email: $(`input[name="email"]`).val().trim(),
            password: $(`input[name="password"]`).val().trim()
        };

        if(!userData.email || !userData.password){
            return;
        }else{
            $.post(`/api/login`, userData).then((response) => {
                $(`input[name="email"]`).val(``);
                $(`input[name="password"]`).val(``);
                window.location.replace(response);
            }).catch(err => {
                console.log(err);
            });
        }
    });

    $(`form.signup`).on(`submit`, e => {
        e.preventDefault();
        let userData = {
            email: $(`input[name="email"]`).val().trim(),
            password: $(`input[name="password"]`).val().trim()
        };

        if(!userData.email || !userData.password){
            return;
        }else{
            $.post(`/api/signup`, userData).then((response) => {
                $(`input[name="email"]`).val(``);
                $(`input[name="password"]`).val(``);
                window.location.replace(response);
            }).catch(err => {
                console.log(err.responseJSON);
            });
        }
    });

    // $(`#photoSubmit`).on(`click`, function(e) {
    //     e.preventDefault();
    //     let formData = new FormData($(`form#imgForm`));
    //     $.ajax({
    //         type: `POST`,
    //         url: `/profile/image`,
    //         data: formData,
    //         enctype: `multipart/form-data`,
    //         processData: false,
    //         success: function () {
    //             location.reload(true);
    //         }
    //     });        
    // });

    
});