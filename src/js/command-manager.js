/* GeneralBot JS by JvNeto */
/* Date: 20/06/2021 */

const pathParams = new URLSearchParams(window.location.search);
const paramLang = pathParams.get("lang");
var paramForceLang = pathParams.get("force");
if (paramForceLang == "" || paramForceLang == null) paramForceLang = "false";

var pathOrigin = window.location.origin;
const deployState = true;

if (pathOrigin == "http://localhost" || deployState == false)
    pathOrigin = `${pathOrigin}/generalbot`;
else pathOrigin = `${pathOrigin}/generalbot`;

const LangValidate = (lang) => {
    const langSystem = navigator.language;
    var replaceLang = langSystem.replace("-", "_");
    var langAvailable = ["pt_BR"];
    if (langAvailable.indexOf(lang) != -1) return lang;
    if (langAvailable.indexOf(replaceLang) != -1 && paramForceLang == "false")
        return replaceLang;
    else return "en";
};

const ManagerLoader = (state) => {
    document.getElementById("ContainerBodyCommands").innerHTML = "";
    document.getElementById("CommandsLoader").style.display = state ?
        "flex" :
        "none";
};

const ButtonState = (state) => {
    document.getElementById("BtnUsers").style.borderBottom = "none";
    document.getElementById("BtnGames").style.borderBottom = "none";
    document.getElementById("BtnStaff").style.borderBottom = "none";
    document.getElementById("BtnAdmins").style.borderBottom = "none";
    document.getElementById("BtnSecurity").style.borderBottom = "none";
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
        case "security":
            document.getElementById("BtnSecurity").style.borderBottom =
                "2px solid #14006d";
            break;
    }
};

const ViewCreate = (commands, modelCommand, jsonLang) => {
    $.getJSON(`${pathOrigin}/functions/${commands}.json`, (json) => {
        json.map((data) => {
            var response = "";
            const permission =
                jsonLang && jsonLang["INDEX"][data.permission] ?
                jsonLang["INDEX"][data.permission] :
                data.permission;
            response += `<h5>Permissão:</h5><h6>${permission}</h6>`;
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

                const description =
                    jsonLang && jsonLang["COMMANDS"][modelCommand][data.descriptions] ?
                    jsonLang["COMMANDS"][modelCommand][data.descriptions] :
                    data.descriptions;
                response += `</div><h6>${description}</h6></div><hr style="background-color: #7289da; display: none"/>`;
            });
            ManagerLoader(false);
            document.getElementById("ContainerBodyCommands").innerHTML = response;
        });
    });
};

const SwitchCommands = (commands) => {
    const lang = LangValidate(paramLang);
    ManagerLoader(true);
    ButtonState(commands);
    const command = ["users", "games", "staff", "admins", "security"];
    const modelCommand = commands.toUpperCase();
    if (command.indexOf(commands) > -1) {
        if (lang == "pt_BR")
            $.getJSON(`${pathOrigin}/lang/${lang}.json`, function(jsonLang) {
                ViewCreate(commands, modelCommand, jsonLang);
            });
        else ViewCreate(commands, modelCommand, "");
    } else {
        ManagerLoader(false);
        document.getElementById(
            "ContainerBodyCommands"
        ).innerHTML = `<div class="alert alert-danger" role="alert"><strong>Olá, uma falha aconteceu ao carregar. Tente novamente mais tarde!</strong></div>`;
    }
};