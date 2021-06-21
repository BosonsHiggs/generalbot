var pathOrigin = window.location.origin;
const deployState = true;

if (pathOrigin == "http://localhost" || deployState == false)
  pathOrigin = `${pathOrigin}/Projects/generalbot/functions`;
else pathOrigin = `${pathOrigin}/generalbot/functions`;

const ManagerLoader = (state) => {
  document.getElementById("ContainerBodyCommands").innerHTML = "";
  document.getElementById("CommandsLoader").style.display = state
    ? "flex"
    : "none";
};

const ButtonState = (state) => {
  document.getElementById("BtnUsers").style.borderBottom = "none";
  document.getElementById("BtnGames").style.borderBottom = "none";
  document.getElementById("BtnStaff").style.borderBottom = "none";
  document.getElementById("BtnAdmins").style.borderBottom = "none";
  switch (state) {
    case "users":
      document.getElementById("BtnUsers").style.borderBottom =
        "2px solid #43b581";
      break;
    case "games":
      document.getElementById("BtnGames").style.borderBottom =
        "2px solid #7289da";
      break;
    case "staff":
      document.getElementById("BtnStaff").style.borderBottom =
        "2px solid #faa61a";
      break;
    case "admins":
      document.getElementById("BtnAdmins").style.borderBottom =
        "2px solid #f04747";
      break;
  }
};

const SwitchCommands = (commands) => {
  ManagerLoader(true);
  ButtonState(commands);
  const command = ["users", "games", "staff", "admins"];
  if (command.indexOf(commands) > -1) {
    $.getJSON(`${pathOrigin}/${commands}.json`, (json) => {
      json.map((data) => {
        var response = "";
        response += `<h5>Permissão:</h5><h6>${data.permission}</h6>`;
        data.commands.map((data) => {
          const commandsLength = data.commands.length;
          var init = 1;
          data.commands.map((data) => {
            if (init == 1) {
              response += `<div class="commands"><div id="CommandsLineAdd" class="commands-line">`;
            }
            response += `<code>${data}</code>`;
            if (commandsLength > 1 && init <= commandsLength - 1) {
              response += `<span>ou</span>`;
            }
            init++;
          });
          response += `</div><h6>${data.descriptions}</h6></div>`;
        });
        ManagerLoader(false);
        document.getElementById("ContainerBodyCommands").innerHTML = response;
      });
    });
  } else {
    ManagerLoader(false);
    document.getElementById(
      "ContainerBodyCommands"
    ).innerHTML = `<div class="alert alert-danger" role="alert"><strong>Olá, uma falha aconteceu ao carregar. Tente novamente mais tarde!</strong></div>`;
  }
};
