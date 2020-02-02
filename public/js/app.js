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

    $(`#animal-search-update`).on(`click`, function(e) {
        let id = $(this).data(`userid`);
        e.preventDefault();
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
            emailOn: $(`.email-radio:checked`).val() || null
        };

        if(Object.values(searchData).includes(false)){
            console.log(`missing info`);
        }else{
            console.log(searchData.emailOn);
            $.ajax({
                type: `PUT`,
                url: `/api/update-animal-search/${id}`,
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

    $(`#type-input`).change(function(){
        let breedType = $(this).val();
        console.log(breedType);
        let breedOptions = {
            Dog: [`Affenpinscher`,`Afghan Hound`,`Airedale Terrier`,`Akbash`,`Akita`,`Alaskan Malamute`,`American Bulldog`,`American Bully`,`American Eskimo Dog`,`American Foxhound`,`American Hairless Terrier`,`American Staffordshire Terrier`,`American Water Spaniel`,`Anatolian Shepherd`,`Appenzell Mountain Dog`,`Aussiedoodle`,`Australian Cattle Dog / Blue Heeler`,`Australian Kelpie`,`Australian Shepherd`,`Australian Terrier`,`Basenji`,`Basset Hound`,`Beagle`,`Bearded Collie`,`Beauceron`,`Bedlington Terrier`,`Belgian Shepherd / Laekenois`,`Belgian Shepherd / Malinois`,`Belgian Shepherd / Sheepdog`,`Belgian Shepherd / Tervuren`,`Bernedoodle`,`Bernese Mountain Dog`,`Bichon Frise`,`Black and Tan Coonhound`,`Black Labrador Retriever`,`Black Mouth Cur`,`Black Russian Terrier`,`Bloodhound`,`Blue Lacy`,`Bluetick Coonhound`,`Boerboel`,`Bolognese`,`Border Collie`,`Border Terrier`,`Borzoi`,`Boston Terrier`,`Bouvier des Flandres`,`Boxer`,`Boykin Spaniel`,`Briard`,`Brittany Spaniel`,`Brussels Griffon`,`Bull Terrier`,`Bullmastiff`,`Cairn Terrier`,`Canaan Dog`,`Cane Corso`,`Cardigan Welsh Corgi`,`Carolina Dog`,`Catahoula Leopard Dog`,`Cattle Dog`,`Caucasian Sheepdog / Caucasian Ovtcharka`,`Cavachon`,`Cavalier King Charles Spaniel`,`Cavapoo`,`Chesapeake Bay Retriever`,`Chihuahua`,`Chinese Crested Dog`,`Chinese Foo Dog`,`Chinook`,`Chiweenie`,`Chocolate Labrador Retriever`,`Chow Chow`,`Cirneco dell'Etna`,`Clumber Spaniel`,`Cockapoo`,`Cocker Spaniel`,`Collie`,`Coonhound`,`Corgi`,`Coton de Tulear`,`Curly-Coated Retriever`,`Dachshund`,`Dalmatian`,`Dandie Dinmont Terrier`,`Doberman Pinscher`,`Dogo Argentino`,`Dogue de Bordeaux`,`Dutch Shepherd`,`English Bulldog`,`English Cocker Spaniel`,`English Coonhound`,`English Foxhound`,`English Pointer`,`English Setter`,`English Shepherd`,`English Springer  Spaniel`,`English Toy Spaniel`,`Entlebucher`,`Eskimo Dog`,`Feist`,`Field Spaniel`,`Fila Brasileiro`,`Finnish Lapphund`,`Finnish Spitz`,`Flat-Coated Retriever`,`Fox Terrier`,`Foxhound`,`French Bulldog`,`Galgo Spanish Greyhound`,`German Pinscher`,`German Shepherd Dog`,`German Shorthaired Pointer`,`German Spitz`,`German Wirehaired Pointer`,`Giant Schnauzer`,`Glen of Imaal Terrier`,`Golden Retriever`,`Goldendoodle`,`Gordon Setter`,`Great Dane`,`Great Pyrenees`,`Greater Swiss Mountain Dog`,`Greyhound`,`Hamiltonstovare`,`Harrier`,`Havanese`,`Hound`,`Hovawart`,`Husky`,`Ibizan Hound`,`Icelandic Sheepdog`,`Illyrian Sheepdog`,`Irish Setter`,`Irish Terrier`,`Irish Water Spaniel`,`Irish Wolfhound`,`Italian Greyhound`,`Jack Russell Terrier`,`Japanese Chin`,`Jindo`,`Kai Dog`,`Karelian Bear Dog`,`Keeshond`,`Kerry Blue Terrier`,`Kishu`,`Klee Kai`,`Komondor`,`Kuvasz`,`Kyi Leo`,`Labradoodle`,`Labrador Retriever`,`Lakeland Terrier`,`Lancashire Heeler`,`Leonberger`,`Lhasa Apso`,`Lowchen`,`Lurcher`,`Maltese`,`Maltipoo`,`Manchester Terrier`,`Maremma Sheepdog`,`Mastiff`,`McNab`,`Miniature Bull Terrier`,`Miniature Dachshund`,`Miniature Pinscher`,`Miniature Poodle`,`Miniature Schnauzer`,`Mixed Breed`,`Morkie`,`Mountain Cur`,`Mountain Dog`,`Munsterlander`,`Neapolitan Mastiff`,`New Guinea Singing Dog`,`Newfoundland Dog`,`Norfolk Terrier`,`Norwegian Buhund`,`Norwegian Elkhound`,`Norwegian Lundehund`,`Norwich Terrier`,`Nova Scotia Duck Tolling Retriever`,`Old English Sheepdog`,`Otterhound`,`Papillon`,`Parson Russell Terrier`,`Patterdale Terrier / Fell Terrier`,`Pekingese`,`Pembroke Welsh Corgi`,`Peruvian Inca Orchid`,`Petit Basset Griffon Vendeen`,`Pharaoh Hound`,`Pit Bull Terrier`,`Plott Hound`,`Pointer`,`Polish Lowland Sheepdog`,`Pomeranian`,`Pomsky`,`Poodle`,`Portuguese Podengo`,`Portuguese Water Dog`,`Presa Canario`,`Pug`,`Puggle`,`Puli`,`Pumi`,`Pyrenean Shepherd`,`Rat Terrier`,`Redbone Coonhound`,`Retriever`,`Rhodesian Ridgeback`,`Rottweiler`,`Rough Collie`,`Saint Bernard`,`Saluki`,`Samoyed`,`Sarplaninac`,`Schipperke`,`Schnauzer`,`Schnoodle`,`Scottish Deerhound`,`Scottish Terrier`,`Sealyham Terrier`,`Setter`,`Shar-Pei`,`Sheep Dog`,`Sheepadoodle`,`Shepherd`,`Shetland Sheepdog / Sheltie`,`Shiba Inu`,`Shih poo`,`Shih Tzu`,`Shollie`,`Siberian Husky`,`Silky Terrier`,`Skye Terrier`,`Sloughi`,`Smooth Collie`,`Smooth Fox Terrier`,`South Russian Ovtcharka`,`Spaniel`,`Spanish Water Dog`,`Spinone Italiano`,`Spitz`,`Staffordshire Bull Terrier`,`Standard Poodle`,`Standard Schnauzer`,`Sussex Spaniel`,`Swedish Vallhund`,`Tennessee Treeing Brindle`,`Terrier`,`Thai Ridgeback`,`Tibetan Mastiff`,`Tibetan Spaniel`,`Tibetan Terrier`,`Tosa Inu`,`Toy Fox Terrier`,`Toy Manchester Terrier`,`Treeing Walker Coonhound`,`Vizsla`,`Weimaraner`,`Welsh Springer Spaniel`,`Welsh Terrier`,`West Highland White Terrier / Westie`,`Wheaten Terrier`,`Whippet`,`White German Shepherd`,`Wire Fox Terrier`,`Wirehaired Dachshund`,`Wirehaired Pointing Griffon`,`Wirehaired Terrier`,`Xoloitzcuintli / Mexican Hairless`,`Yellow Labrador Retriever`,`Yorkshire Terrier`],
            Cat: [`Abyssinian`,`American Bobtail`,`American Curl`,`American Shorthair`,`American Wirehair`,`Applehead Siamese`,`Balinese`,`Bengal`,`Birman`,`Bombay`,`British Shorthair`,`Burmese`,`Burmilla`,`Calico`,`Canadian Hairless`,`Chartreux`,`Chausie`,`Chinchilla`,`Cornish Rex`,`Cymric`,`Devon Rex`,`Dilute Calico`,`Dilute Tortoiseshell`,`Domestic Long Hair`,`Domestic Medium Hair`,`Domestic Short Hair`,`Egyptian Mau`,`Exotic Shorthair`,`Extra-Toes Cat / Hemingway Polydactyl`,`Havana`,`Himalayan`,`Japanese Bobtail`,`Javanese`,`Korat`,`LaPerm`,`Maine Coon`,`Manx`,`Munchkin`,`Nebelung`,`Norwegian Forest Cat`,`Ocicat`,`Oriental Long Hair`,`Oriental Short Hair`,`Oriental Tabby`,`Persian`,`Pixiebob`,`Ragamuffin`,`Ragdoll`,`Russian Blue`,`Scottish Fold`,`Selkirk Rex`,`Siamese`,`Siberian`,`Silver`,`Singapura`,`Snowshoe`,`Somali`,`Sphynx / Hairless Cat`,`Tabby`,`Tiger`,`Tonkinese`,`Torbie`,`Tortoiseshell`,`Toyger`,`Turkish Angora`,`Turkish Van`,`Tuxedo`,`York Chocolate`],
            Rabbit: [`American`,`American Fuzzy Lop`,`American Sable`,`Angora Rabbit`,`Belgian Hare`,`Beveren`,`Britannia Petite`,`Bunny Rabbit`,`Californian`,`Champagne D'Argent`,`Checkered Giant`,`Chinchilla`,`Cinnamon`,`Creme D'Argent`,`Dutch`,`Dwarf`,`Dwarf Eared`,`English Lop`,`English Spot`,`Flemish Giant`,`Florida White`,`French Lop`,`Harlequin`,`Havana`,`Himalayan`,`Holland Lop`,`Hotot`,`Jersey Wooly`,`Lilac`,`Lionhead`,`Lop Eared`,`Mini Lop`,`Mini Rex`,`Netherland Dwarf`,`New Zealand`,`Palomino`,`Polish`,`Rex`,`Rhinelander`,`Satin`,`Silver`,`Silver Fox`,`Silver Marten`,`Tan`],
            Horse: [`Appaloosa`,`Arabian`,`Belgian`,`Clydesdale`,`Connemara`,`Curly Horse`,`Donkey`,`Draft`,`Friesian`,`Gaited`,`Grade`,`Haflinger`,`Icelandic Horse`,`Lipizzan`,`Miniature Horse`,`Missouri Foxtrotter`,`Morgan`,`Mule`,`Mustang`,`Paint / Pinto`,`Palomino`,`Paso Fino`,`Percheron`,`Peruvian Paso`,`Pony`,`Pony of the Americas`,`Quarterhorse`,`Rocky Mountain Horse`,`Saddlebred`,`Shetland Pony`,`Standardbred`,`Tennessee Walker`,`Thoroughbred`,`Warmblood`],
            Bird: [`African Grey`,`Amazon`,`Brotogeris`,`Budgie / Budgerigar`,`Button-Quail`,`Caique`,`Canary`,`Chicken`,`Cockatiel`,`Cockatoo`,`Conure`,`Dove`,`Duck`,`Eclectus`,`Emu`,`Finch`,`Goose`,`Guinea Fowl`,`Kakariki`,`Lory / Lorikeet`,`Lovebird`,`Macaw`,`Ostrich`,`Parakeet (Other)`,`Parrot (Other)`,`Parrotlet`,`Peacock / Peafowl`,`Pheasant`,`Pigeon`,`Pionus`,`Poicephalus / Senegal`,`Quail`,`Quaker Parakeet`,`Rhea`,`Ringneck / Psittacula`,`Rosella`,`Swan`,`Toucan`,`Turkey`],
            Barnyard: [`Alpaca`,`Alpine`,`Angora`,`Angus`,`Barbados`,`Boer`,`Cow`,`Duroc`,`Goat`,`Hampshire`,`Holstein`,`Jersey`,`LaMancha`,`Landrace`,`Llama`,`Merino`,`Mouflon`,`Myotonic / Fainting`,`Nigerian Dwarf`,`Nubian`,`Oberhasli`,`Pig`,`Pot Bellied`,`Pygmy`,`Saanen`,`Sheep`,`Shetland`,`Toggenburg`,`Vietnamese Pot Bellied`,`Yorkshire`]
        };
        breedOptions[breedType].forEach(breed => {
            $(`#breed-input`).append(`<option value="${breed}">${breed}</option>`);
        });
    });

    $(``);

});

function isAnswered(answer){
    // eslint-disable-next-line quotes
    if(answer && answer !== "" && answer !== `Choose...`){
        return answer;
    }else{
        return false;
    }
}
