# Firefox Password Generator

A simple Firefox extension that allows the user to generate and manage passwords for different websites.

Password generation is customizable, allowing the user to select the length of the desired password and what character sets to include (uppercase letters, lowercase letters, numbers, and symbols). Password generation is done using pseudo-random numbers. Any generated or typed password can be saved for the current website, and it is stored in local browser storage using the JavaScript browser.storage API. All saved passwords will remain in local storage as long as the extension is installed. They can be loaded or deleted at any time. At this time only one saved password is allowed per url, however a future update will allow multiple username/password combinations to be saved for a given url. 

Password Generator.xpi is a complete Firefox extension file, and can be directly added to Firefox
NOTE: this extension is unsigned, therefore the extension can only be added via the .xpi to Firefox Developer Edition

All icons/graphics are created by myself
