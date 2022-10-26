/* GeneralBot JS by JvNeto */
/* Date: 19/06/2021 */

var state = false;
const MenuManager = (stateInjact) => {
  stateInjact != undefined ? (state = stateInjact) : false;
  document.getElementById("HeaderMenuContainer").style.display = state
    ? "none"
    : "flex";
  document.getElementById("MenuButtom").innerHTML = state
    ? `<i class="fas fa-bars"></i>`
    : `<i class="fas fa-times"></i>`;
  state = state ? false : true;
};
const MenuManagerReset = () => {
  if (screen.width > 470) MenuManager(false);
  else MenuManager(true);
};
window.onresize = MenuManagerReset;
window.onload = MenuManagerReset;
