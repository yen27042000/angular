

// API for GlobalCountries
const API_GlobalCountries = "https://api-kent.netlify.app/.netlify/functions/api/global";

// API for Daily Vaccines
const API_DailyVaccines   = "https://api-kent.netlify.app/.netlify/functions/api/vn/daily/vaccines";

// Init
let table;
window.addEventListener('load',() => {
	table = document.getElementById("table");
	getDataGlobal();
});


//----------
// Get Data
//----------

// Get Data Global
function getDataGlobal(){
	fetch(API_GlobalCountries)
		.then(data => data.json())
		.then(jsonData => {displayDataGlobal(jsonData);
			document.getElementById("loader").style.display = "none";
			document.getElementById("global").style.display = "block";
			document.getElementById("footer").style.display = "block";
		})
		.catch(e => console.log(e));
}

// AJAX
function getDataGlobalAgain(){
	let xmlHttpRequest = new XMLHttpRequest();xmlHttpRequest.addEventListener('load',e => {
		if(xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200){let jsonData = xmlHttpRequest.response;
			displayDataGlobal(jsonData);
		}else{console.log(e);}
	});xmlHttpRequest.open('GET',API_GlobalCountries,true);xmlHttpRequest.responseType = 'json';xmlHttpRequest.send();
}


//---------
// Display
//---------
function displayDataGlobal(jsonData){
	table.innerHTML = '';
	var GlobalCases = 0;
	var GlobalRecovered = 0;
	var GlobalDeaths = 0;
	jsonData.forEach(u => {
		// Global
		GlobalCases+=u.cases;
		GlobalRecovered+=u.recovered;
		GlobalDeaths+=u.deaths;
		document.getElementById("GlobalCases").innerHTML = ShorterValue(GlobalCases,1);
		document.getElementById("GlobalRecovered").innerHTML = ShorterValue(GlobalRecovered,1);
		document.getElementById("GlobalDeaths").innerHTML = ShorterValue(GlobalDeaths,1);

		// Countries
		let tr = document.createElement('tr');
		let td0 = document.createElement('td');
		let td1 = document.createElement('td');
		let td2 = document.createElement('td');
		let td3 = document.createElement('td');
		let td4 = document.createElement('td');
		let td5 = document.createElement('td');

		td0.innerHTML = `<img class="flagCountry" src="`+u.countryInfo.flag+`">`;
		td1.innerHTML = u.country;
		td2.innerHTML = u.cases.toLocaleString('en-US')+`<br><span>+`+u.todayCases.toLocaleString('en-US')+`</span>`; //Commas thousands
		td3.innerHTML = u.recovered.toLocaleString('en-US')+`<br><span>+`+u.todayRecovered.toLocaleString('en-US')+`</span>`;
		td4.innerHTML = u.deaths.toLocaleString('en-US')+`<br><span>+`+u.todayDeaths.toLocaleString('en-US')+`</span>`;
		td5.innerHTML = u.population.toLocaleString('en-US');

		tr.appendChild(td0);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		table.appendChild(tr);

		// Custom Rate in Vietnam
		if(u.country == "Vietnam"){
			var Population     = u.population;
			document.getElementById("Population").innerHTML = ShorterValue(Population,2);
			getDataDailyVaccines(Population);
		}
	});
	//Wait 1s
	setTimeout(()=>{}, 1000);
}

function loadDataPopup(dataEN){
	document.getElementById("nameAbData").textContent = dataEN.AboutTheData.title;
	document.getElementById("aboutTheData").innerHTML = dataEN.AboutTheData.content;
	document.getElementById("nameVaccine").textContent = dataEN.AboutVaccineTechnology.title;
	document.getElementById("aboutTheVaccine").innerHTML = dataEN.AboutVaccineTechnology.content;
	document.getElementById("nameVaccineDetails").textContent = dataEN.AboutVaccineDetails.title;
	document.getElementById("aboutTheVaccineDetails").innerHTML = dataEN.AboutVaccineDetails.content;
	document.getElementById("nameVariant").textContent = dataEN.AboutCoronavirusVariant.title;
	document.getElementById("aboutTheVariant").innerHTML = dataEN.AboutCoronavirusVariant.content;
	document.getElementById("nameGuide").textContent = dataEN.SoftwareInfo.title;
	document.getElementById("aboutGuide").innerHTML = dataEN.SoftwareInfo.content;
}


//---------
// SHORTER
//---------
// Shorter Num Million Not Tail
function ShorterNum(num) {
    var units = ["tr"];
    var unit = Math.floor((num / 1.0e+1).toFixed(0).toString().length);
    var r = unit%3;
    var x =  Math.abs(Number(num))/Number('1.0e+'+(unit-r)).toFixed(2);
    return x.toFixed(0) + units[Math.floor(unit/3)-2];
}
// Shorter Num Million With Tail
function ShorterValue(num,n) {
    var newValue = num;
	var suffixes = ["", "K", "M", "M"];
	var suffixNum = Math.floor((""+num).length/3 );
	var shortValue = '';
	shortValue = parseFloat((suffixNum != 0 ? (num/Math.pow(1000,suffixNum)):num));
	if(shortValue<1 && suffixNum==3){shortValue*=1000}
	shortValue = shortValue.toFixed(n);
	newValue = shortValue+suffixes[suffixNum];
    return newValue;
}
// Format Percent Num
function numDigitsAfterDecimal(num) {
	var afterDecimalStr = num.toString().split('.')[1] || ''
	return afterDecimalStr.length
}
function formatTailNum(num){
	if(numDigitsAfterDecimal(num)==0){num+=`.00`}
	if(numDigitsAfterDecimal(num)==1){num+=`0`}
	return num;
}


// DateTime
function Zero(num) {return (num >= 0 && num < 10) ? "0" + num : num + "";}
setInterval(()=>{
    var now = new Date();
    var strDateTime = [[Zero(now.getDate()),
        Zero(now.getMonth() + 1), now.getFullYear()].join("/"),
        [Zero(now.getHours()),Zero(now.getMinutes())].join(":"),
        now.getHours() >= 12 ? "PM" : "AM"].join(" ");
    document.getElementById("time").innerHTML = strDateTime;
},1000);

// Update data every 15 mins
setInterval(()=>{getDataGlobalAgain();},(1000*60*15));

//------
// END
//------



