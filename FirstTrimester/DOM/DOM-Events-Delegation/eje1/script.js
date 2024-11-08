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

document.getElementById("style-select").addEventListener("change", function(){
    const theme = this.ariaValueMax;
    const stylesheet = document.getElementById("theme-styesheet");

    if (theme === "light") {
        stylesheet.href = "light.css";
      } else if (theme === "dark") {
        stylesheet.href = "dark.css";
      } else if (theme === "minimalist") {
        stylesheet.href = "minimalist.css";
      }

})