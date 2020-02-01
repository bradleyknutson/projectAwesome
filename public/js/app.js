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
        var searchData = {
            name: isAnswered($(`#name-input`).val().trim()) || false,
            type: isAnswered($(`#type-input`).val().trim()) || false,
            breed: isAnswered($(`#breed-input`).val()) || null,
            age: isAnswered($(`#age-input`).val().trim()) || null,
            gender: isAnswered($(`#gender-select`).val()) || null,
            // eslint-disable-next-line camelcase
            good_with_children: isAnswered($(`#children-select`).val()) || null,
            // eslint-disable-next-line camelcase
            good_with_dogs: isAnswered($(`#dogs-select`).val()) || null,
            // eslint-disable-next-line camelcase
            good_with_cats: isAnswered($(`#cats-select`).val()) || null,
            location: isAnswered($(`#zip-input`).val().trim()) || false,
        };

        if(Object.values(searchData).includes(false)){
            console.log(`missing info`);
        }else{
            console.log(searchData);
            $.ajax({
                type: `POST`,
                url: `/api/save-animal-search`,
                data: searchData,
                success: function (res) {
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
                }
            }).catch(err => {
                console.log(`search form error`, err);
            });
        }
        // send post request & clear inputs

    });
    $(`#userInfoSubmit`).on(`click`, e => {
        e.preventDefault();
        let userInfoObj = {
            firstName: isAnswered($(`#first-name`).val().trim()) || null,
            lastName: isAnswered($(`#last-name`).val().trim()) || null,
            email: isAnswered($(`#email`).val().trim()) || false,
            mainAddress: isAnswered($(`#address`).val().trim()) || null,
            secondAddress: isAnswered($(`#address2`).val().trim()) || null,
            city: isAnswered($(`#city`).val().trim()) || null,
            state: isAnswered($(`#state`).val().trim()) || null,
            zipcode: isAnswered($(`#zip`).val().trim()) || null,
        };
        if(Object.values(userInfoObj).includes(false)){
            console.log(`Needs more info`);
        }else{
            $.ajax({
                type: `PUT`,
                url: `/api/user-update`,
                data: userInfoObj,
                success: function (res) {
                    $(`#first-name`).val(``);
                    $(`#last-name`).val(``);
                    $(`#email`).val(``);
                    $(`#address`).val(``);
                    $(`#address2`).val(``);
                    $(`#city`).val(``);
                    $(`#state`).val(``);
                    $(`#zip`).val(``);
                    window.location.replace(res);
                }
            });
        }
    
    });

    $(`.searchDelete`).on(`click`, function(e) {
        e.preventDefault();
        let id = $(this).data(`id`);
        $.ajax({
            type: `DELETE`,
            url: `/api/delete-animal-search/${id}`,
        }).then(res => {
            window.location.replace(res);
        });
    });

});

function isAnswered(answer){
    // eslint-disable-next-line quotes
    if(answer && answer !== "" && answer !== `Choose...`){
        return answer;
    }else{
        return false;
    }
}
