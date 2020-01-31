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
    $(`#animal-search-submit`).on(`click`, event => {
        event.preventDefault();
        let searchData = {
            name: $(`#name-input`).val().trim(),
            type: $(`#type-input`).val().trim(),
            breed: $(`#breed-input`).val(),
            age: $(`#age-input`).val().trim(),
            gender: $(`#gender-select`).val(),
            good_with_children: $(`#children-select`).val(),
            good_with_dogs: $(`#dogs-select`).val(),
            good_with_cats: $(`#cats-select`).val(),
            location: $(`zip-input`).val().trim(),
        };
        // send post request & clear inputs
        $.post(`/api/save-animal-search`, searchData).then((res) => {
            console.log(`searchData`,searchData);
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
