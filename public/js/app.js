$(function () {
    $(`form.login`).on(`submit`, e => {
        e.preventDefault();
        let userData = {
            email: $(`input[name="email"]`).val().trim(),
            password: $(`input[name="password"]`).val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        } else {
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

        if (!userData.email || !userData.password) {
            return;
        } else {
            $.post(`/api/signup`, userData).then((response) => {
                $(`input[name="email"]`).val(``);
                $(`input[name="password"]`).val(``);
                window.location.replace(response);
            }).catch(err => {
                console.log(err.responseJSON);
            });
        }
    });
    // get the search form data
    $(`#search-form`).on(`submit`, event => {
        event.preventDefault();
        let searchData = {
            name: $(`#name-input`).val().trim(),
            type: $(`#type-input`).val().trim(),
            breed: $(`#breed-input`).val(),
            age: $(`#age-input`).val().trim(),
            gender: $(`#gender-select`).val(),
            children: $(`#children-select`).val(),
            dogs: $(`#dogs-select`).val(),
            cats: $(`#cats-select`).val(),
            zip: $(`zip-input`).val().trim(),
        };
        // send post request & clear inputs
        $.post(`/api/search`, searchData).then((res) => {
            $(`#name-input`).val(``);
            $(`#type-input`).val(``);
            $(`#breed-input`).val(``);
            $(`#age-input`).val(``);
            $(`#gender-select`).val(``);
            $(`#children-select`).val(``);
            $(`#dogs-select`).val(``);
            $(`#cats-select`).val(``);
            $(`#zip-input`).val(``);
            window.location.replace(res);
        }).catch(err => {
            console.log(`search form error`, err.resJSON);
        });

    });

});
