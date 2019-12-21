import React from 'react';
// import ReactDOM from 'react-dom'
import './Screen.css';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

function textView(text, fontFace){
    const styleName = function(fontFace){
        if (fontFace !== undefined){
            switch(fontFace){
                case "B":
                    return "boldText";
                case "SB":
                    return "semiBoldText";
                case "R":
                    return "regularText";
                default:
                    return "regularText";
            }
        }
        return "regularText";
    }
    const view = <p className={styleName(fontFace)}>{text}</p>
    return view;
}

function titleBar(){
    const view = 
        <div className="titleBar">
            {textView("Weather Application", "B")}
        </div>
    return view;
}

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
          color: "white"
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
        },
      },
    },
})(TextField);

function listItemView(pText, sText){
    const view = 
    <div>
        <List component="nav" aria-label="main mailbox folders">
            <ListItem dense={true}>
                <ListItemText primary={pText} secondary={sText}/>
            </ListItem>
        </List>
        <Divider />
    </div>

    return view;

}

function customListItemView(pText, sText, rText, imageUrl){
    const view = 
        <div className ="lItemCover">
            <div className="listItem">
                <div className="leftContent">
                    <img src={imageUrl} alt="pImage" className="listItemImage"/>
                </div>
                <div className="centerContent">
                    <div> <p> {pText} </p> </div>
                    <div> <p> {sText} </p> </div>
                </div>
                <div className="rightContent">
                <h3> {rText} </h3>
                </div>
            </div>
            <Divider/>
        </div>
    return view;
}

function changeCityButton(panelViewCB, refreshConditionCB){
    const view = 
        <div className="changeCityButton">
            <div className="changeCityBtn">
                <Button variant="contained"  color="primary" onClick = {panelViewCB} >Change City</Button>
            </div>
            <Button variant="contained"  color="primary" onClick = {refreshConditionCB}>Refresh </Button>
        </div>
    return view;
}

function showEmptyCityNameWarning(show){
    var view = 
    <div>
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={show}
            autoHideDuration={2000}
            ContentProps={{
            'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">City name cannot be empty</span>}
        />
      </div>
    return view;
}

function changeCityView(changeCityCB, cancelCityChangeCB){
    const view =
        <div className="changeCityView">
            <h2> Change City ... </h2>
            
            <div className="changeCityPanel">
                <div> 
                    <CssTextField id="cityName" label="City Name ..." variant="outlined" className="cityNameInput"/> 
                </div>
                <div className= "cityChangeButton"> 
                    <Button variant="contained"  
                        color="primary"
                        className = "changeBtn" 
                        onClick = { () => { 
                                var cityName = document.getElementById("cityName").value;
                                changeCityCB(cityName);
                            }
                        }>
                        Change City
                    </Button>
                    <div className="space"></div>
                    <Button variant="contained"  
                        color="primary" 
                        className = "cancelBtn"
                        onClick= {cancelCityChangeCB}
                        >
                        Cancel
                    </Button> 
                </div>
            </div>
        </div>

    return view;
}

function weatherImageMap(weather){
    var image = "";
    if(weather.main) {
        weather = weather.main.toLowerCase();
    } else {
        weather = (weather+"").toLowerCase().split(" ")[0];
    }
    if(weather === "clear" || weather === "fog" || weather === "sunny" || weather === "clouds" || weather === "rain" || weather === "thunderstorm"){
        image = weather;
    } else image = "weather";
    return "assets/"+image+".png";
}

function currentConditionsView(data, panelViewCB, refreshCB){
    const contents = function(){
        if (data.currentCondition !== undefined) {
            var tData =  data.currentCondition.main;
            var wData = data.currentCondition.weather[0];
            var windData = data.currentCondition.wind;
            const view =
                <div>
                    <img src={weatherImageMap(wData)} alt="weather condition" className="conditionImage"/>
                    <h1 align="center">{tData.temp} <sup>°</sup>C</h1>
                    {listItemView("Max Temp: " + tData.temp_max + "°C | Min Temp: " + tData.temp_min + "°C")}
                    {listItemView("Condition: " + wData.main + " (" + wData.description + ")")}
                    {listItemView("Humidity: " + tData.humidity+ "%")}
                    {listItemView("Winds: " + windData.speed+ " m/s")}
                    {changeCityButton(panelViewCB, refreshCB)}

                </div>
            return view;
        } else {
            const view = 
            <div>
                <div className = "progressBarView">
                    <CircularProgress />
                </div>
                <div className = "progressText">
                    {textView("Loading weather details...")}</div>
                </div>;
            return view;

        }
    }
    const locationData = 
        <div>
        <div> <h2>{data.city} </h2> </div>
        <List component="nav" aria-label="main mailbox folders">
            <ListItem>
                <ListItemText primary={data.currentTime}/>
            </ListItem>
        </List>
        </div>;

    const view = 
        <div className="currentCondition">
            {locationData}
            <Divider/>
            {contents()}
        </div>

    return view;
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function refineTimeString(data){
    var time = parseInt(data.split(":")[0]);
    if (time === 0) return "12:00 AM";
    if(time < 12) return time+":00 AM";
    else if(time === 12) return time +":00 PM";
    else return (time-12) + ":00 PM";
}

function refineData(data){
    var refinedData = {};
    refinedData['minTemp']  = data.main.temp_min;
    refinedData['maxTemp']  = data.main.temp_max;
    refinedData['currTemp'] = data.main.temp;
    refinedData['humidity'] = data.main.humidity +"%";
    refinedData['weather']  = data.weather[0].main + " (" + data.weather[0].description + ")";
    refinedData['time']     = refineTimeString(data.dt_txt.split(" ")[1]);
    refinedData['date']     = data.dt_txt.split(" ")[0];
    return refinedData;
}

function extractForecastData(data){
    if (data !== undefined) {
        var forecastList = data.list;
        var currentDayData = [];
        var nextDayData = [];
        var upcomingDaysData = [];
        var todayDate = new Date().getDate() + '';
        var nDay = new Date().getDate()+1 + '';
        var lDate = nDay;

        for(var i=0; i<forecastList.length; i++){
            var itemDate = forecastList[i].dt_txt.split(" ")[0].split("-")[2];
            if(itemDate === todayDate){
                currentDayData.push(refineData(forecastList[i]));
            } else if(itemDate === nDay){
                nextDayData.push(refineData(forecastList[i]));
            } else if(lDate !== itemDate){
                lDate = itemDate;
                upcomingDaysData.push(refineData(forecastList[i]));
            }
        }
        
        return {
            today : currentDayData
        ,   nextDay : nextDayData
        ,   upcoming : upcomingDaysData
        }
    }

    return undefined;
}

function currentDayForecast(data){
    data = data.today;
    var view = [];
    for(var i=0; i<data.length; i++){
        var pText = data[i].time;
        var sText = data[i].weather + " | Humidity: " + data[i].humidity;
        var rText = data[i].maxTemp + "°C  / " + data[i].minTemp + "°C";
        var img = data[i].weather.split("(")[0];
        view.push(customListItemView(pText, sText, rText, weatherImageMap(img)));
    }
    return view;
}

function nextDayForecast(data){
    data = data.nextDay;
    var view = [];
    for(var i=0; i<data.length; i++){
        var pText = data[i].time;
        var sText = data[i].weather + " | Humidity: " + data[i].humidity;
        var rText = data[i].maxTemp + "°C  / " + data[i].minTemp + "°C";
        var img = data[i].weather.split("(")[0];
        view.push(customListItemView(pText, sText, rText, weatherImageMap(img)));
    }
    return view;
}

function futureDayForecast(data){
    data = data.upcoming;
    var view = [];
    for(var i=0; i<data.length; i++){
        var pText = data[i].date;
        var sText = data[i].weather + " | Humidity: " + data[i].humidity;
        var rText = data[i].maxTemp + "°C  / " + data[i].minTemp + "°C";
        var img = data[i].weather.split("(")[0];
        view.push(customListItemView(pText, sText, rText, weatherImageMap(img)));
    }
    return view;

}

function forecastTabsView(cIndex, forecastData, cb){
    const tabSwitch = (e, index) => {
        cb(index);
    }
    var forecastDataRefined = extractForecastData(forecastData);

    var renderedTabView = function(data, renderer){
        if(data !== undefined){
            return renderer(data);
        } else {
            const view = 
            <div>
                <CircularProgress />
                {textView("Loading weather details...")}
            </div>;
            return view;
        }
    }

    var view = 
        <div>
            <AppBar position="static">
                <Tabs value={cIndex} onChange={tabSwitch}  aria-label="simple tabs example">
                    <Tab label="Today" {...a11yProps(0)} />
                    <Tab label="Tommorow" {...a11yProps(1)} />
                    <Tab label="Next 5 days" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={cIndex} index={0}>
                {renderedTabView(forecastDataRefined, currentDayForecast)}
            </TabPanel>
            <TabPanel value={cIndex} index={1}>
                {renderedTabView(forecastDataRefined, nextDayForecast)}
            </TabPanel>
            <TabPanel value={cIndex} index={2}>
                {renderedTabView(forecastDataRefined, futureDayForecast)}
            </TabPanel>
        </div>
    return view;
}
  
function forecastView(cIndex, forecastData, cb){
    const view = 
        <div>
            <h2>Upcoming ...</h2>
            <br/>
            {forecastTabsView(cIndex, forecastData, cb)}
        </div>
    return view;
}

function contentLayout(changeCityCB, panelViewCB, switchTabCB, cancelCityChangeCB, refreshCB, data){
    const leftPanel = function(data){
        if (data.changeCity) {
            return changeCityView(changeCityCB, cancelCityChangeCB)
        } else {
            return currentConditionsView(data, panelViewCB, refreshCB)
        }
    }

    const view = 
        <div className="content">
            <Grid container spacing={3} className="gridStyle">
                <Grid item xs={data.xsl}>
                    { leftPanel(data) }
                </Grid>
                <Grid item xs={data.xsr}> {forecastView(data.forecastTabIndex, data.forecastData, switchTabCB)} </Grid>
            </Grid>
            {showEmptyCityNameWarning(data.showNoCityInputWarning)}
        </div>
    return view;
}

function fetchWeatherData(city, dataType, cb) {
    const apiKey = "99bd4cdede69c84c507d6b99c5f81a63";
    const baseUrl = "http://api.openweathermap.org/data/2.5/";
    const dataParam = (dataType === "current" ? "weather":"forecast"); 
    axios.get(baseUrl + dataParam + "?q="+ city + `&APPID=` + apiKey + `&units=metric`)
      .then(res => {
        cb(res.data);
    });
}

function updateBackground(currentConditions){
    var weather = currentConditions.weather[0].main.toLowerCase();
    var gradient = "";
    if(weather === "fog" || weather === "mist" )
        gradient = "linear-gradient(180deg, #26383e 0%, #62787c 90%)";
    else if(weather === "clouds")
        gradient = "linear-gradient(180deg, #616161 0%, #62787c 90%)";
    else if(weather === "clear") 
        gradient = "linear-gradient(180deg, #0d47a1 0%, #1565c0 90%)";
    
    if(gradient != "")
        document.getElementById('parentBody').style.backgroundImage = gradient;
}

class Dashboard extends React.Component {
    constructor(){
        super();
        this.state = {
            city : "Delhi",
            changeCity : false,
            forecastTabIndex: 0,
            showNoCityInputWarning: false
        };
        this.updateCity = this.updateCity.bind(this);
        this.updateCurrentConditions = this.updateCurrentConditions.bind(this);
        this.updateForecastData = this.updateForecastData.bind(this);
        this.toggleChangeCityView = this.toggleChangeCityView.bind(this);
        this.switchActiveTab = this.switchActiveTab.bind(this);
        this.cancelCityChange = this.cancelCityChange.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }

    updateCurrentConditions(currentConditions){
        this.setState( state => ({
                currentCondition : currentConditions
            })
        );
        updateBackground(currentConditions);
    }

    updateForecastData(forecastData){
        this.setState( state => ({
            forecastData : forecastData
        })
    );
    }

    updateCity(newCity) {
        if(newCity !== ""){
            this.setState( state => ({
                    city : newCity
                ,   changeCity : false
                ,   currentCondition : undefined
                ,   forecastData : undefined
                })
            );
            fetchWeatherData(newCity, "current", this.updateCurrentConditions);
            fetchWeatherData(newCity, "forecast", this.updateForecastData);
        } else {
            this.setState(state => ({
                showNoCityInputWarning : true
            }));
            setTimeout(() => {
                this.setState(state => ({
                    showNoCityInputWarning : false
                }));

            }, 2000);
        }
    }

    refreshData(){
        this.setState( state => ({
            currentCondition : undefined
        ,   forecastData : undefined
        })
        );
        fetchWeatherData(this.state.city, "current", this.updateCurrentConditions);
        fetchWeatherData(this.state.city, "forecast", this.updateForecastData);
    }

    cancelCityChange(){
        this.setState(state => ({
            changeCity : false
        }));
    }

    toggleChangeCityView(){
        this.setState(state =>({
            changeCity: !this.state.changeCity
        }));
    }

    switchActiveTab(index){
        this.setState(state => ({
            forecastTabIndex : index
        }));
    }

    componentDidMount() {
        var xsl, xsr;
        if(window.screen.width < 800) {
            xsl = 12;
            xsr = 12;
        } else {
            xsl = 4;
            xsr = 8;
        }
        document.getElementById('parentBody').style.background = "#006064";
        fetchWeatherData(this.state.city, "current", this.updateCurrentConditions);
        fetchWeatherData(this.state.city, "forecast", this.updateForecastData);
        this.setState(state => ({
            currentTime : Date(),
            xsl: xsl,
            xsr: xsr
        }));
    }

    render(){
        const view = 
            <div className="panel">
                {titleBar()}
                {contentLayout(this.updateCity, this.toggleChangeCityView, this.switchActiveTab, this.cancelCityChange, this.refreshData, this.state)}
            </div>;

        return view;
    }
}

export default Dashboard;