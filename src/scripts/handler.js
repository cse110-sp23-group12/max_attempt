const submitButton = document.getElementById('submitButton');
const stageOne = document.getElementById('stageOne');
const fortuneCookieContainer = document.getElementById('fortuneCookies');
const stageThree = document.getElementById("stageThree");
const stageFour = document.getElementById("stageFour");
const seeFortuneButton = document.getElementById('seeFortuneButton');
const yourFortune = document.getElementById("yourFortune");

/*
    For Context:
        Stage One: Start of site where user inputs their prompt and submits
        Stage Two (/Fortune Cookies): Display cookies and have user crack them
        Stage Three: Once enough cookies are cracked, allow user to advance with button
        Stage Four: Show the user's fortune
*/

let cookieCrackedCount = 0; // how many cookies the user has clicked so far
let fortuneText = ""; // text that the fortune teller will return at the end
const cookieCount = 5; // cookies to show on screen (if this is changed then change css too)
const numToPick = 3; // # of cookies to be cracked

submitButton.addEventListener('click', async function() {
    stageOne.style.display = "none"; // make original screen invisible when button clicked
    const userInput = document.getElementById('userInput').value; // the inputted text in the textbox

    // fetch the tarot card data from the JSON file
    const response = await fetch('../../assets/data/tarot.json') 
    const tarotData = await response.json(); 
    let tarots = tarotData.map(tarot => tarot.name);
    // TODO: Randomize the tarots order
    // Handle the API response
    const apiResponsePromise = getResponseFromAPI(userInput, tarots.slice(0, 3));
    apiResponsePromise.then(apiResponse => {
        fortuneText = apiResponse;
    });
    fortuneCookieContainer.innerHTML = '';

    // make five interactable cookies
    // TODO: Make the first cookie clicked the first in tarots array, the second the second etc
    for (let i = 0; i < cookieCount; i++) {
        const fortuneCookie = document.createElement('div');
        fortuneCookie.className = 'fortuneCookie';

        // create an img element and set its src to the tarot card image URL
        const img = document.createElement('img');
        img.src = tarotData[i].img;
        img.style.display = 'none'; // initially hide the image

        // Create a p element for the description and initially hide it
        const description = document.createElement('p');
        description.textContent = tarotData[i].description;
        description.style.display = 'none';
        description.className = 'description'; // add class for css styling

        fortuneCookie.appendChild(img);
        fortuneCookie.appendChild(description);

        fortuneCookie.addEventListener('click', function() {
            // if cookie can be opened
            if (cookieCrackedCount < numToPick) {
                this.className += ' open'; // open the cookie
                cookieCrackedCount++;
                img.style.display = 'block'; // show the image
            }
            // once there are enough cookies opened
            if (cookieCrackedCount === numToPick) {
                // allow user to advance
                stageThree.style.display = "block";
            }
        });

        // the below mouseover and mouseout could likely be optimized

        // show description on hover after cookie is opened
        fortuneCookie.addEventListener('mouseover', function() {
            if (fortuneCookie.classList.contains('open')) {
                description.style.display = 'block';
            }
        });

        // hide description when not hovered over
        fortuneCookie.addEventListener('mouseout', function() {
            description.style.display = 'none';
        });

        fortuneCookieContainer.appendChild(fortuneCookie);
    }
    fortuneCookieContainer.style.display = 'flex';
    adjustFortuneCookieHeight(); // adjust height to its width
});

// when the see fortune button is clicked, take the user to their fortune
seeFortuneButton.addEventListener('click', function() {
    fortuneCookies.style.display = "none";
    stageThree.style.display = 'none';
    stageFour.style.display = "block";
    yourFortune.innerHTML = `Your fortune: ${fortuneText}`;
});

window.addEventListener('resize', adjustFortuneCookieHeight);

/**
 * Helper function to properly size the height of the fortune cookies
 */
function adjustFortuneCookieHeight() {
    var fortuneCookies = document.getElementsByClassName('fortuneCookie');
    for (var i = 0; i < fortuneCookies.length; i++) {
        var fortuneCookie = fortuneCookies[i];
        fortuneCookie.style.height = fortuneCookie.offsetWidth + 'px';
    }
}