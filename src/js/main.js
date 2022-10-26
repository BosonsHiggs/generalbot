var caret = document.getElementsByClassName("caret");
var i;

for (i = 0; i < caret.length; i++) {
    caret[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
    
  });
}
