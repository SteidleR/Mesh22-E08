let weeklyChallengeContainer = document.getElementById("weekly-challenge-box");

$.get("/challenges/weekly", (data, status) => {
    let data_p = JSON.parse(data);

    weeklyChallengeContainer.innerHTML += "<p><i class='"+ data_p[0][0] + "'></i> " + data_p[0][1] + "</p>";
    weeklyChallengeContainer.innerHTML += "<p><i class='"+ data_p[1][0] + "'></i> " + data_p[1][1] + "</p>";
    weeklyChallengeContainer.innerHTML += "<p><i class='"+ data_p[2][0] + "'></i> " + data_p[2][1] + "</p>";
})