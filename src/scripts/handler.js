let cookieCount = 0;
document.getElementById('submitButton').addEventListener('click', function() {
    document.getElementById("stageOne").style.display = "none";
    var userInput = document.getElementById('userInput').value;

    console.log(userInput);

    var fortuneCookies = [
        'You will have a great day!',
        'Your efforts will soon be rewarded.',
        'A pleasant surprise is waiting for you.',
        'Now is the time to try something new.',
        'Your hard work will soon pay off.'
    ];

    var fortuneCookieContainer = document.getElementById('fortuneCookies');

    fortuneCookieContainer.innerHTML = '';

    for (var i = 0; i < fortuneCookies.length; i++) {
        var fortuneCookie = document.createElement('div');
        fortuneCookie.className = 'fortuneCookie';
        fortuneCookie.dataset.fortune = fortuneCookies[i];
        fortuneCookie.addEventListener('click', function() {
            if (cookieCount < 3) {
                this.className += ' open';
                cookieCount++;
            }
            if (cookieCount === 3) {
                document.getElementById("stageThree").style.display = "block";
            }
        });
        fortuneCookieContainer.appendChild(fortuneCookie);
    }

    fortuneCookieContainer.style.display = 'flex';
    adjustFortuneCookieHeight();
});

window.addEventListener('resize', adjustFortuneCookieHeight);

function adjustFortuneCookieHeight() {
    var fortuneCookies = document.getElementsByClassName('fortuneCookie');
    for (var i = 0; i < fortuneCookies.length; i++) {
        var fortuneCookie = fortuneCookies[i];
        fortuneCookie.style.height = fortuneCookie.offsetWidth + 'px';
    }
}