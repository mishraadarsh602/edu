//time script starts
let sunSound = new Audio("./music/sun.mp3");
let clearSkySound = new Audio("./music/clearsky.mp3");
let rainSound = new Audio("./music/rain.mp3");
let rainThunderSound = new Audio("./music/rain-and-thunder.mp3");
let hazeSound = new Audio("./music/haze.mp3");

const dateId = document.getElementById("date");
const date = new Date();

const getDayName = () => {
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",]

    return weekday[date.getDay()];
}
const getMonthName = () => {
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return month[date.getMonth()] + " " + date.getDate();
    //console.log() ;

}
const getFullTime = () => {

    let Hours = date.getHours();
    let Minutes = date.getMinutes();
    let Seconds = date.getSeconds();


    //Hours>12?24-Hours:Hours;
    Format = "AM";
    if (Hours > 11) {
        Format = "PM";
        if (Hours > 12) {
            Hours = Hours - 12;
        }

    }
    if (Hours === 0) {
        Hours = 12;
    }

    if(Minutes<10){
        Minutes="0"+Minutes;    }
        if(Hours<10){
            Hours="0"+Hours;
        }
        if(Seconds<10){
            Seconds="0"+Seconds;
        }
    // (Minutes<10)?"0"+Minutes:Minutes;

    return Hours + " : " + Minutes + " : " + Seconds + " " + Format;

}

dateId.innerHTML = ` ${getDayName()} | ${getMonthName()} | ${getFullTime()}`;


//time script ends

//api starts
var city = "delhi";
let temp = document.getElementById("temp");
let tempmin = document.getElementById("tempmin");
let tempmax = document.getElementById("tempmax");
let locInput = document.getElementById("location");
let country = document.getElementById("country");
let desc = document.getElementById("desc");
let humidity = document.getElementById("humidity");
let windspeed = document.getElementById("windspeed");
let rain = document.getElementById("rain");
let sun = document.getElementById("sun");
let cloud = document.getElementById("cloud");
let drizzle = document.getElementById("drizzle");
let haze = document.getElementById("haze");


document.getElementById("search-btn").addEventListener("click", (e) => {
    e.preventDefault();
    city = document.getElementById("city").value;

    console.log(city);
    app(city);

})
console.log("city" + city);

const app = async (city) => {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=37fadf2998492bfcda272dc67ca35c23&units=metric`;

        let data = await fetch(url);

        let result = await data.json();
        console.log(result.main.temp)

        temp.innerHTML = result.main.temp;
        tempmin.innerHTML = result.main.temp_min;
        tempmax.innerHTML = result.main.temp_max;
        locInput.innerHTML = result.name;
        // .toUpperCase()+city.slice(1);;
        // console.log(city);
        desc.innerHTML = result.weather[0].main;
        country.innerHTML = result.sys.country;
        humidity.innerHTML = result.main.humidity;
        windspeed.innerHTML = result.wind.speed;
        rain.style.display = "none";
        sun.style.display = "none";
        cloud.style.display = "none";
        drizzle.style.display = "none";
        haze.style.display = "none";
        let weather = result.weather[0].main;
        console.log("weather : " + weather)
        if (weather === "Clouds" || weather === "Thunderstorm") {
            // weatherIcon.innerHTML = "<img src='./sun.png' height='50px'>"
            cloud.style.display = "inline-block";
            rainThunderSound.play();
            clearSkySound.pause();
            hazeSound.pause();
            sunSound.pause();
            rainSound.pause();

        } else if (weather === "Rain") {
            rain.style.display = "inline-block";
            rainSound.play();
            clearSkySound.pause();
            hazeSound.pause();
            sunSound.pause();
            rainThunderSound.pause();


        } else if (weather === "Drizzle" || weather === "Mist") {
            drizzle.style.display = "inline-block";
            rainSound.play();
            clearSkySound.pause();
            hazeSound.pause();
            sunSound.pause();
            rainThunderSound.pause();



        } else if (weather === "Clear") {
            sun.style.display = "inline-block";
            // clearSkySound.play();
            rainSound.pause();
            hazeSound.pause();
            sunSound.play();
            rainThunderSound.pause();

        } else if (weather === "Haze") {
            haze.style.display = "inline-block";
            hazeSound.play();
            rainSound.pause();
            clearSkySound.pause();
            sunSound.pause();
            rainThunderSound.pause();


        }
        else {
            sun.style.display = "inline-block";
            sunSound.play();
            rainSound.pause();
            clearSkySound.pause();
            hazeSound.pause();
            rainThunderSound.pause();

        }

    } catch (error) {
        //alert("Incorrect location!! Please enter corect location name");
        let myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
        myModal.show();
        console.log(error)

    }
    // end of catch block





}

app(city);
