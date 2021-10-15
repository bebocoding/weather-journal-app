

// Create a new date instance dynamically with JS
function getDate(){
    let d = new Date();
    let newDate = d.getDate()+'.'+ ( d.getMonth()+1 ) +'.'+ d.getFullYear();
    return newDate;
}
// Personal API Key for OpenWeatherMap API
const apiKey = '0cbd1204ea0786d4be62669546083ff7';
const submitButton = document.querySelector('#generate');

// Event listener to add function to existing HTML DOM element
submitButton.addEventListener('click',getWeather);
/* Function To run the program */
async function getWeather(evt){
    evt.preventDefault();
    const content = document.querySelector('#feelings').value;

    const zip = document.querySelector('#zip').value;

    if(!zip){
        alert('Enter zip code first!');
    }
    else{
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=metric`;
        const temp = await getTemperature(url);

        const date = getDate();

        sendData(date,temp,content);

        const finalData = await getFinalData();
        updateUI(finalData);
    }
    
    
}
/* Function to GET Web API Data*/
const getTemperature = async (url)=>{
    try{
    const response = await fetch(url);

    
        const data = await response.json();
        return data.main.temp;
    }catch(error){
        alert('can\'t find the city, please enter the right zip code (US)');
    }

}
/* Function to POST data and save it to our server API  */
const sendData = async (date,temp,content)=>{
    const data = {
        date,
        temp,
        content
    }
    const response = await fetch('/sendData',{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    })

    
    
    
  
}
/* Function to GET all data */
async function getFinalData(){
    try{
        const getData = await fetch ('/getAll');
        const finalData = await getData.json();
        return finalData;
    }catch(err){
        console.log('ERROR: ',err);
    }
}
/* Updating UI function */
function updateUI(myData){
    document.querySelector('#date').innerHTML = `Date: ${myData.date}`;
    document.querySelector('#temp').innerHTML = `temp: ${myData.temp} C`;
    document.querySelector('#content').innerHTML = `feeling: ${myData.content}`;

}

