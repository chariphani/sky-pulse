import React from 'react'
import './Livew.css'

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const FORECAST_API_KEY = import.meta.env.VITE_FORECAST_API_KEY;
const AIR_POLLUTION_API_KEY = import.meta.env.VITE_AIR_POLLUTION_API_KEY;


async function tt(e) {
  e.preventDefault();

  let c = document.getElementsByClassName('uy')[0].value;
  console.log(c);

  let ww = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=${WEATHER_API_KEY}&units=metric`);
  let dd = await ww.json();
  console.log(dd);


  if (dd.cod !== 200) {
    alert(`Error: ${dd.message}`);
    return;
  }


  let r = dd.name;
  let t = dd.main.temp;
  let sk = dd.weather[0].description;

  $('#cn')[0].innerText = r;
  $('#al')[0].innerText = r;
  $('#dd')[0].innerText = t;
  $('#sd')[0].innerText = sk;

  let p = dt(dd.dt);
  $('#ii')[0].innerText = p;

  let pr = new Date(dd.sys.sunrise * 1000).toLocaleTimeString();
  let ps = new Date(dd.sys.sunset * 1000).toLocaleTimeString();
  $('#oo').text(pr);
  $('#oi').text(ps);

  let lat = dd.coord.lat;
  let lon = dd.coord.lon;
  aui(lat, lon);
}

function dt(timestamp) {

    const data = new Date(timestamp * 1000);
    console.log(data.toUTCString());
    console.log(data.toLocaleString());
    return data.toLocaleString();



}
async function aui(lat, lon, temp, weather, date) {
    try {
        let aqdata = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${AIR_POLLUTION_API_KEY}`);
        let fds = await aqdata.json();
        console.log(fds);

        if (fds.list && fds.list.length > 0) {
            let fdd = fds.list[0].components;
            console.log(fdd);


            $('#co').text('CO');
            $('#cov').text(fdd.co);

            $('#so').text('SO₂');
            $('#so2').text(fdd.so2);

            $('#o3').text('O₃');
            $('#o3v').text(fdd.o3);

            $('#no2').text('NO₂');
            $('#no2v').text(fdd.no2);
        } else {
            console.error("No air quality data found.");
        }
    } catch (error) {
        console.error("Error fetching air quality data:", error);
    }
    let fv = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${FORECAST_API_KEY}&units=metric`);
    let five = await fv.json();
    console.log(five);

    const dailyForecasts = five.list.filter(item => item.dt_txt.includes("12:00:00"));

    dailyForecasts.slice(0, 5).forEach((day, index) => {
        const date = day.dt_txt.split(" ")[0];
        const temp = day.main.temp;
        const weather = day.weather[0].description;


        $(`#per${index}`).text(`${temp} °C`);
        $(`#des${index}`).text(weather);
        $(`#dat${index}`).text(date);
    });

    const todayDate = new Date().toISOString().split('T')[0];

    const todayForecasts = five.list.filter(item => item.dt_txt.startsWith(todayDate));


    todayForecasts.slice(0, 6).forEach((item, index) => {
        const time = item.dt_txt.split(" ")[1].slice(0, 5);
        const temp = item.main.temp;

        $(`#time${index}`).text(time);
        $(`#temp${index}`).text(`${temp} °C`);
    });


}



const Livew = () => {
    return (
        <>
            <div className='hig'>
                <div>
                    <nav className="navbar bg-body-tertiary oo">
                        <div className="container-fluid llo">
                            <div id='loco'>
                                <img src="https://cdn-icons-png.flaticon.com/512/678/678310.png" alt=""  width={35}/>
                            <h3>SkyPulse</h3>
                            </div>
                            <form className="d-flex ww" role="search">
                                <input className="form-control me-2  uy" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit" onClick={tt}>Search</button>
                            </form>
                        </div>
                    </nav>
                </div>
                <div className='p'>
                    <div className="ls">
                        <div className="tb b">
                            <h6 id='cn'>City Name</h6>
                            <h5 > <span id='dd'> 0</span> &deg;C</h5>
                            <h6 id='sd'> Sky Description</h6>
                            <hr className='line' />


                            <div className="icon2">

                                <img src="https://png.pngtree.com/png-clipart/20250130/original/pngtree-calendar-3d-icon-isolated-on-a-transparent-background-symbolizing-schedules-and-png-image_20358144.png" alt="" width={25} />
                                <h6 id='ii'>Date</h6>
                            </div>

                        </div>
                        <div className="bb b">
                            <h6 id='cd'>Coming 4 Days</h6>

                            <div className="five">
                                <div className="ff">
                                    <img src="https://images.icon-icons.com/526/PNG/512/cloud_icon-icons.com_52471.png" alt="" width={35} />
                                    <h6 id='per1'> 7 &deg; C</h6>

                                </div>
                                <h6 id='des1'>Friday</h6>
                                <h6 id='dat1' >01-8-2025</h6>
                            </div>
                            <div className="five">
                                <div className="ff">
                                    <img src="https://images.icon-icons.com/526/PNG/512/cloud_icon-icons.com_52471.png" alt="" width={35} />
                                    <h6 id='per2'>7 &deg; C</h6>

                                </div>
                                <h6 id='des2'>Friday</h6>
                                <h6 id='dat2'>01-8-2025</h6>
                            </div>
                            <div className="five">
                                <div className="ff">
                                    <img src="https://images.icon-icons.com/526/PNG/512/cloud_icon-icons.com_52471.png" alt="" width={35} />
                                    <h6 id='per3'>7 &deg; C</h6>

                                </div>
                                <h6 id='des3'>Friday</h6>
                                <h6 id='dat3'>01-8-2025</h6>
                            </div>
                            <div className="five">
                                <div className="ff">
                                    <img src="https://images.icon-icons.com/526/PNG/512/cloud_icon-icons.com_52471.png" alt="" width={35} />
                                    <h6 id='per4'>7 &deg; C</h6>

                                </div>
                                <h6 id='des4'>Friday</h6>
                                <h6 id='dat4'>01-8-2025</h6>
                            </div>
                        </div>
                    </div>
                    <div className="rs">
                        <div className='gg'>
                            <div className="tr">
                                <div className="exm">
                                    <img src="https://uxwing.com/wp-content/themes/uxwing/download/weather/weather-icon.png" alt="" width={35} />
                                </div>
                                <div className="nn">
                                    <h2>Today's Weather Overview for <span id='al'>Any City</span> </h2>
                                </div>

                            </div>


                        </div>
                        <div className="sun ">
                            <div className="tr1 two">
                                <h5>Air Quality Index(AQI)</h5>
                                <div className="imh">
                                    <img src="https://cdn-icons-png.freepik.com/256/13923/13923006.png?semt=ais_incoming" alt="" width={30} />

                                    <div className='uu'>
                                        <div className="met" >
                                            <h6 id='co'>AQI Metric</h6>
                                            <h5 id='cov'>0</h5>
                                        </div>
                                        <div className="met" >
                                            <h6 id='so'>AQI Metric</h6>
                                            <h5 id='so2' >0</h5>
                                        </div>
                                        <div className="met" >
                                            <h6 id='o3'>AQI Metric</h6>
                                            <h5 id='o3v'>0</h5>
                                        </div>
                                        <div className="met" >
                                            <h6 id='no2'>AQI Metric</h6>
                                            <h5 id='no2v' >0</h5>
                                        </div>
                                    </div>
                                </div>



                            </div>
                            <div className="tr4 two three">
                                <h5>Sunrise & Sunset</h5>
                                <div className='rf'>

                                    <div className="sris">
                                        <img src="https://cdn-icons-png.flaticon.com/512/9055/9055356.png" alt="" width={50} />
                                        <div className="imfo">
                                            <h6>Sunrise</h6>
                                            <h5 id='oo'>6:00Am</h5>
                                        </div>
                                    </div>
                                    <div className="sunset">
                                        <div className='ni'>
                                            <img src="https://www.shareicon.net/data/512x512/2015/08/04/79959_moon_512x512.png" alt="" width={80} />
                                            <div className="hh">
                                                <h6>Sunset</h6>
                                                <h5 id='oi'>8:00Pm</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>





                            </div>
                        </div>
                        <div className='yy'>
                            <h5>Today</h5>
                        </div>
                        <div className="today">

                            <div className="tr6 three">
                                <h6 id="time0">12:00 </h6>
                                <img src="https://cdn-icons-png.freepik.com/256/16227/16227679.png" alt="" width={35} />
                                <h5 id="temp0">15 &deg;C</h5>

                            </div>
                            <div className="tr6 three">
                                <h6 id="time1">15:00 </h6>
                                <img src="https://cdn-icons-png.freepik.com/256/16227/16227679.png" alt="" width={35} />
                                <h5 id="temp1"> 15 &deg;C</h5>

                            </div>
                            <div className="tr6 three">
                                <h6 id="time2">20:00 </h6>
                                <img src="https://cdn-icons-png.freepik.com/256/16227/16227679.png" alt="" width={35} />
                                <h5 id="temp2">15 &deg;C</h5>

                            </div>
                         
                            <div className="tr6 three">
                                <h6 id="time4">23:00 </h6>
                                <img src="https://cdn-icons-png.freepik.com/256/16227/16227679.png" alt="" width={35} />
                                <h5 id="temp4">15 &deg;C</h5>

                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Livew
