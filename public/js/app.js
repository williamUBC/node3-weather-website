fetch('http://puzzle.mead.io/puzzle')
    .then((response) => {
        return response.json();// To extract the JSON body content from the response, we use the json() method 
    })
    .then(data => console.log(data));

const getWeather = (loc) => {
    fetch(`/weather?address=${loc}`)
        .then((response) => response.json())
        .then(data => {
            if (!data.error) {                
                const {name, temperature, precipitation, decription, icon} = data;
                weatherIcon.src = icon;
                message1.textContent = `${loc} is ${decription}. The temperature of it is ${temperature} and the precipitation level is ${precipitation}.`;
            } else {
                throw new Error(data.error);                
            }
        })
        .catch(err => {
            message2.textContent = err;            
        });
}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherIcon = document.getElementById('img-weather-icon'); 
const message1 = document.getElementById('message-1');
const message2 = document.getElementById('message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();// prevent refresh page
    const location = search.value;
    message1.textContent = 'Loading...';
    message2.textContent = '';
    getWeather(location);
    //console.log('testing!' + search.value);
})