axios
  .get("https://generalbot-api.cleverapps.io/status")
  .then(function (response) {
    switch (response.data.status) {
      case "UPDATE":
        document.getElementById("StatesContainer").style.display = "flex";
        document.getElementById("StateText").innerHTML = "UPDATE";
        document.getElementById("StateText").style.color = "#00aeffc7";
        break;
      case "ONLINE":
        document.getElementById("StatesContainer").style.display = "flex";
        document.getElementById("StateText").innerHTML = "ONLINE";
        document.getElementById("StateText").style.color = "#43b581";
        break;
      case "OFFLINE":
        document.getElementById("StatesContainer").style.display = "flex";
        document.getElementById("StateText").innerHTML = "OFFLINE";
        document.getElementById("StateText").style.color = "#f04747";
        break;
    }
  })
  .catch(function (error) {
    document.getElementById("StatesContainer").style.display = "none";
  });
