// variable declarations for all dynamic html elements on popup window
const generate_button = document.getElementById("generate");
const slider = document.getElementById("pwlenslider");
const slider_label = document.getElementById("rangeValue");
const exit_button = document.getElementById("exit");
const reset_button = document.getElementById("reset");
const gen_output_box = document.getElementById("pwtocopy");
const copy_button = document.getElementById("copy");
const save_box = document.getElementById("savebox");
const savebox_copy_button = document.getElementById("copy2");
const save_button = document.getElementById("save");
const load_button = document.getElementById("load");
const delete_button = document.getElementById("delete");
const uppercase_checkbox = document.getElementById("uppercase");
const lowercase_checkbox = document.getElementById("lowercase");
const symbols_checkbox = document.getElementById("symbols");
const numbers_checkbox = document.getElementById("numbers");

// available sets of characters to be used in password generation
const password_charset = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz",
"!()-.?[]_`~;:!@#$%^&*+=", "0123456789"];

// updates value displayed next to slider when input is given to slider
slider.addEventListener("input", function() {
    slider_label.innerText = slider.value;
})

// generates password and displays when generate button clicked
generate_button.addEventListener("click", function() {
    gen_output_box.value = generate_password(slider.value);
})

// closes popup when exit button clicked
exit_button.addEventListener("click", function() {
    window.close();
})

// resets all values to default when reset button clicked
reset_button.addEventListener("click", function() {
    reset_gui();
})

// copies generated password to clipboard when copy button clicked
copy_button.addEventListener("click", function() {
    gen_output_box.select();
    navigator.clipboard.writeText(gen_output_box.value);
})

// copies text from save/load/delete textbox when copy button clicked
savebox_copy_button.addEventListener("click", function() {
    save_box.select();
    navigator.clipboard.writeText(save_box.value);
})

// saves password to browser storage when save button is clicked
// note: saved password is unique to the url of the active tab
// displays an error when no password is available to save
save_button.addEventListener("click", function() {
    save_password();
});

// load password from storage when load button is clicked
// note: loaded password is unique to the url of the active tab
// displays an error when no password exists to load from storage
load_button.addEventListener("click", function() {
    load_password();
});

// delete password from storage when delete button is clicked
// note: deleted password is unique to the url of the active tab
// displays an error when no password exists to delete
delete_button.addEventListener("click", function() {
    delete_password();
});

// resets all gui values to default
// sets all checkboxes to checked, resets slider to 15, and clears text boxes
function reset_gui() {
    uppercase_checkbox.checked = true;
    lowercase_checkbox.checked = true;
    symbols_checkbox.checked = true;
    numbers_checkbox.checked = true;
    slider.value = 15;
    slider_label.innerText = "15";
    gen_output_box.value = "";
    save_box.value = "";
}

// saves text currently in gen_output_box to local browser storage
// note: saved password is linked to url of active tab, allowing unique password
// to be saved for any number of sites
// displays error if gen_output_box is empty when save button clicked
function save_password() {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        let url = tabs[0].url;
        let to_save = gen_output_box.value;
        if (to_save != "") {
            browser.storage.local.set({[url]: to_save})
            .then(() => {
                save_box.value = "Password saved!";
            });
        }
        else {
            save_box.value = "Save error: No password to save";
        }
    });
}

// loads saved password for url of active tab and displays in gen_output_box
// displays error if no password exists in browser storage for url of active tab
function load_password() {
    browser.tabs.query({ active: true, currentWindow: true})
    .then((tabs) => {
        let url = tabs[0].url;
        browser.storage.local.get(url)
        .then(result => {
            if (result[url]) {
                gen_output_box.value = result[url];
                save_box.value = "Password Loaded!";
            }
            else {
                save_box.value = "No password found."
            }
        });
    });
}

// deletes password saved in storage for url of active tab
// displays error if no saved password exists for url of active tab
function delete_password() {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        let url = tabs[0].url;
        browser.storage.local.get(url)
        .then((result) => {
            if (result[url]) {
                browser.storage.local.remove(url)
                .then(() => {
                    save_box.value = "Password deleted!";
                    gen_output_box.value = "";
                });
            }
            else {
                save_box.value = "Delete error: No password found";
            }
        });
    });
}

// password generation function
// includes characters in generation pool based on user checkbox selections
// @param length: the desired length of the generated password
// @return pw: the generated password, as a string
// note: password generation uses pseudo-random number generation
function generate_password(length) {
    let chars = "";
    if (uppercase_checkbox.checked) chars += password_charset[0];
    if (lowercase_checkbox.checked) chars += password_charset[1];
    if (symbols_checkbox.checked) chars += password_charset[2];
    if (numbers_checkbox.checked) chars += password_charset[3];
    if (!chars.length) return "";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
}
