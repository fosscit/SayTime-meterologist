if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    const startRecognitionButton = document.getElementById('start-recognition');
    const placeNameElement = document.getElementById('place-name');
    const weatherInfoElement = document.getElementById('weather-info');

    startRecognitionButton.addEventListener('click', () => {
        let recognitionInProgress = false;
        
        if (!recognitionInProgress) {
            recognition.start();
            recognitionInProgress = true;
            startRecognitionButton.textContent = 'Recognition in Progress...';
        }
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        placeNameElement.textContent = `You said: ${transcript}`;
        fetchtime(transcript);
    };

    recognition.onend = () => {
        startRecognitionButton.textContent = 'Start Recognition';
    };  
    
} 
else {
    alert("Speech recognition is not supported in your browser.");
}
fetchtime('varkala');
async function fetchtime(transcript) {
    const places = transcript;
    const url = `https://weatherapi-com.p.rapidapi.com/timezone.json?q=${places}`;
    
    console.log(places);    
    console.log(url);
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c28136fdccmshaf75228cbfd6c84p1670bbjsnfd62dba1d24c',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
    namee=result.location.name;
    regionn=result.location.region;
    countryy=result.location.country;
    timee=result.location.localtime; 
    let myArray = timee.split(" ");
    let timearr=myArray[1].split(":");
    let t=" am";
    if(timearr[0]>12)
    {
        timearr[0]-=12;
        t=" pm";
    }
    let x = timearr[0].toString();
    let y = timearr[1].toString();
   let  timees=x.concat(":",y,t);
    let ress=regionn.concat(", ",countryy);
    console.log(namee);
    document.getElementById("place-name").innerHTML=namee;
    document.getElementById("region-country").innerHTML=ress;
    document.getElementById("time").innerHTML=timees;
    document.getElementById("date").innerHTML=myArray[0];
    fetchweather(transcript);
    
} catch (error) {
	console.error(error);
}
 
 }

 async function fetchweather(transcript)
 {
    const temp=transcript;
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${temp}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c28136fdccmshaf75228cbfd6c84p1670bbjsnfd62dba1d24c',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
    temperature=result.current.temp_c;
    spee=result.current.wind_mph;
    rain=result.current.precip_in;
    cloud=result.current.cloud;
    times=result.location.localtime;
    humidityy=result.current.humidity;
    precip=result.current.precip_mm;
    feelslikee=result.current.feelslike_c;
    const timee=times.split(" ");
    document.getElementById("weather-info").innerHTML=temperature;
    document.getElementById("speed").innerHTML=spee;
    document.getElementById("humidity").innerHTML=humidityy;
    document.getElementById("feelslike").innerHTML=feelslikee;
    document.getElementById("precipitation").innerHTML=precip;
    temppp=parseFloat(timee[1]);
    console.log(timee[1]);
   if (rain > 0 || cloud>85) {
        // It's likely to rain, so show the rainy image
        document.getElementById('sunny-image').style.display = 'none';
        document.getElementById('rainy-image').style.display = 'block';
        document.getElementById('cloudy-image').style.display = 'none';
        document.getElementById('night-image').style.display = 'none';
    } else if(rain>0 || cloud>60) {
        // It's not likely to rain, so show the sunny image
        document.getElementById('sunny-image').style.display = 'none';
        document.getElementById('rainy-image').style.display = 'none';
        document.getElementById('cloudy-image').style.display = 'block';
        document.getElementById('night-image').style.display = 'none';
    }
    
    else if (temppp>18.00 )
    {
        document.getElementById('sunny-image').style.display = 'none';
        document.getElementById('rainy-image').style.display = 'none';
        document.getElementById('cloudy-image').style.display = 'none';
        document.getElementById('night-image').style.display = 'block';
    }
     else
    {
        document.getElementById('sunny-image').style.display = 'block';
        document.getElementById('rainy-image').style.display = 'none';
        document.getElementById('cloudy-image').style.display = 'none';
        document.getElementById('night-image').style.display = 'none';
    }
} catch (error) {
	console.error(error);
}
 }