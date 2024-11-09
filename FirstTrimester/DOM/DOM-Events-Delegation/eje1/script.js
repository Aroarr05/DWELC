//
/* 

Create a page to which different styles can be applied depending on the user's
preferences (light mode, dark mode and minimalist), a select will be used, when the
selected value changes, the chosen selection will be applied without the need for a
button.
To select the element where the stylesheet is specified (<link rel="stylesheet"
href="styles.css">) use an appropriate css selector that does not depend on the
position.

*/

// script.js

const themeSelector = document.getElementById('theme-selector');
const themeLink = document.getElementById('theme-stylesheet');

themeSelector.addEventListener('change', function() {
  const selectedTheme = themeSelector.value;
  
  if (selectedTheme === 'light') {
    themeLink.setAttribute('href', 'light.css');
  } else if (selectedTheme === 'dark') {
    themeLink.setAttribute('href', 'dark.css');
  } else if (selectedTheme === 'minimal') {
    themeLink.setAttribute('href', 'minimal.css');
  }
});
