

let cityArr = [];

function loadCity ()
{
  let cityReq = new XMLHttpRequest();
  cityReq.open("GET",'cities.json',false);
  cityReq.send();
  if (cityReq.status==200 && cityReq.readyState == 4 )
  {
    let data = JSON.parse(cityReq.response);
    let arrLength = data.List.length;

    for(let i = 0 ; i < arrLength ; i++){
        // console.log(data.List[i]['CityCode']);
        cityArr.push(data.List[i]['CityCode']);
        // console.log(cityArr);
    }
    return cityReq.responseText;
  }
  else {
    return null;
  }
}



loadCity();
console.log(cityArr);

const apiKey = 'afa49eb584ae9a628206304b42d1b967';
let resource = 'https://api.openweathermap.org/data/2.5/weather?id=';
const getWeather = (resource) => {

    return new Promise((resolve,reject) => {
        const request = new XMLHttpRequest();


        request.open('GET', resource);
        request.send();

        request.addEventListener('readystatechange', () => {
            if(request.readyState === 4 && request.status === 200){
                const data = JSON.parse(request.response)
                resolve(data);
                // console.log(data);
            } else if(request.readyState === 4){
                reject('Sorry couldn\'t fetch data');
            }
        })
    });    
}


let idCount = 0;
let city = '';
let weatherData = [];
let monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug' , 'Sep', 'Oct', 'Nov', 'Dec'];


function createCards(){

    let cardImg = [];
    cardImg.push('Weather App.jpg', 'Weather App-2.jpg','Weather App-3.jpg','Weather App-4.jpg','Weather App-5.jpg','Weather App.jpg','Weather App-2.jpg','Weather App-3.jpg');
    console.log(cardImg);
    apiCall();

    const setcurrTime = setInterval(() => {
        let newTime = new Date();


        if(newTime == addMins){
            
            console.log('data fetched from api');
            apiCall();

        } else{
            console.log('data fetched from cache');
            // console.log(weatherData);

            
        }
    
    
    
        
     }, 3000);




}

createCards();



 function removeCard(btn) {

    alert("remove this city ? ");

    let element = document.getElementById(btn.id);
    console.log(element);
    element.remove();
    
 }


 function hideCards(elem){
    // document.getElementById('test').style.display = 'none';
    let current = document.getElementsByClassName(elem.classList);
    console.log(current);
    console.log("ran");
 }


// const myBlogs = ["https://catalins.tech", "https://exampleblog.com"];
// localStorage.setItem('links', JSON.stringify(myBlogs));

// const storedBlogs = JSON.parse(localStorage.getItem('links'));

console.log(weatherData);

let addMins ;

localStorage.setItem('weather', JSON.stringify(weatherData));
const weather = JSON.parse(localStorage.getItem('weather'));

function newCur(){
     addMins = new Date();
    addMins.setMinutes(addMins.getMinutes() + 5);
}

window.onload = newCur();


function apiCall () {

    let cardImg = [];
    cardImg.push('Weather App.jpg', 'Weather App-2.jpg','Weather App-3.jpg','Weather App-4.jpg','Weather App-5.jpg','Weather App.jpg','Weather App-2.jpg','Weather App-3.jpg');
    console.log(cardImg);
    
    for(let i = 0 ; i < cityArr.length ; i++){

        // idCount++;


        resource = 'https://api.openweathermap.org/data/2.5/weather?id=' + cityArr[i] + '&appid=' + apiKey + '';
        // console.log(resource);
        // getWeather(resource).then(data => console.log('resolved ' + data.name + ' description ' + data.weather[0].description)).catch(err => console.log(err));
        getWeather(resource).then(data => {
            console.log(data);
            weatherData.push(data);
            city = data.name;
            country = data.sys.country;
            temp = (data.main.temp - 273.15).toFixed(1);
            tempMin = (data.main.temp_min - 273.15).toFixed(1);
            tempMax = (data.main.temp_max - 273.15).toFixed(1);
            weatherType = data.weather[0].description;
            weatherIcon = weatherType;
            // console.log(titleCase(weatherType));
            wind = data.wind.speed;
            windDir = data.wind.deg;
            sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {hour12: true});
            sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US',{hour12: true});
            pressure = data.main.pressure;
            humidity = data.main.humidity;
            visibility = data.visibility;
            currTime = new Date().toLocaleString("en-US", {hour: 'numeric', minute: 'numeric', hour12: true});
            day = monthArr[new Date().getMonth()];
            dayNo = new Date().getDate();

            switch(weatherIcon){
                case 'light rain':
                    imageIcon = './images/light rain.png';
                    break;

                case 'clear sky':
                    imageIcon = './images/clear sky.png';
                    break;

                case 'broken clouds':
                    imageIcon = './images/broken clouds.png';
                    break;

                case 'overcast clouds':
                case 'few clouds':
                    imageIcon = './images/clouds.png';
                    break;

                case 'mist':
                    imageIcon = './images/mist.png';
                    break;
            }
            // id = "${idCount}"

            let div = document.createElement('div');
            idCount++;
            div.id = idCount;
            div.classList.add('card');
            div.style.width = "25rem";
            div.addEventListener('click', function handleClick(event) {
                console.log(event.target.parentElement.parentElement.id);

                let elem = document.getElementById(event.target.parentElement.parentElement.id);
                // elem.style.width = "70vw";

                if(elem){
                    for(let i = 0 ; i < cityArr.length ; i++){
                        // document.getElementById(i).style.display = 'none';
                        // console.log(document.getElementById(i).style.display = 'none');
                        if(document.getElementById('test').children[i] == document.getElementById('test').children[elem]){
                            continue;
                        }
                        document.getElementById('test').children[i].style.display = 'none';

                    }
                    elem.style.display = 'block';
                    elem.style.width = "60vw";
                    document.querySelector('.card-body').style.height = "300px";
                    document.querySelector('.text-within').style.height = '500px';
                    document.querySelector('.addWeather').style.display = 'none';

                }
                // let clickedId;
                // clickedId = event.path.id;
                // console.log(clickedId);
                
                



                // let foundIt = document.getElementById(clickedId); 
                // // document.getElementById('test').style.display = 'none';      
                // console.log('found it ' ,foundIt);
            });
            div.innerHTML =
            `
            <p class = "close" id="${idCount}" onclick = "removeCard(this);">x</p>
                <div class="card-main">
                    <img src="./images/${cardImg[i]}" class="card-img-top" alt="...">
                    <div class = "text-within">
                        <div class = "city-details">
                            <h4 class = "city-name">${city}, ${country}</h4>
                            <p>${currTime}, ${day} ${dayNo}</p>
                            <div class = "weather-type">
                                <img src = "${imageIcon}" alt = "" />
                                <p>${weatherType}</p>
                            </div>
                        </div>
                        <div class = "temp-details">
                            <h2>${temp}&deg;C</h2>
                            <p>Temp min  ${tempMin}</p>
                            <p>Temp max  ${tempMax}</p>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div>
                        <p class = "card-text">Pressure: ${pressure}</p>
                        <p class = "card-text">Humidity: ${humidity}</p>
                        <p class = "card-text">Visibility: ${visibility}</p>
                    </div>
                    <div class = "mid-content">
                        <img src = "./images/arrow.png" alt "" />
                        <p class = "wind-speed">${wind}ms/${windDir} Degree</p>
                    </div>
                    <div>
                        <p class = "card-text">Sunrise: ${sunrise}</p>
                        <p class = "card-text">Sunset: ${sunset}</p>
                    </div>
                </div>
            `;
        
          document.querySelector('#test').appendChild(div);


        }).catch(err => console.log(err));

        
 



    }
}

