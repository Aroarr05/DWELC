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