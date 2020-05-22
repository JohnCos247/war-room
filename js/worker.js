var SWITCH_INTERVAL = 30;			    			 //Set the number of seconds you want before switching images.
var BACKGROUND_FILES = [                             //Add new backgrounds here.
    'space.jpg',
//    '1.jpg',
//    '2.jpg',
//    '3.jpg',
//    '4.jpg',
//    '5.jpg',
//    '6.jpg',
//    '7.jpg',
//    '8.jpg',
//    '9.jpg',
//    '10.jpg'
];
var CYCLE_BACKGROUND = false;                         // Set to cycle the background
var TIMES = [
    { 'place': 'California, USA', 'timezone': -9, 'id': 'la' },
    { 'place': 'Colorado, USA', 'timezone': -8, 'id': 'co' },
    { 'place': 'New York, USA', 'timezone': -6, 'id': 'ny' },
    { 'place': 'Bergen, NOR', 'timezone': 0, 'id': 'bn'},
]

// These variables are used in the script do not change.//
var backgrounds = [];
var imageNum = 0;

    $(document).ready(function () {
        initialize();

        //Do Date and Time stuff
        setInterval( function() { updateDateTime(); } , 1000);

        //Set up background-images
        if(CYCLE_BACKGROUND) setInterval(function(){ cycleImages(); }, SWITCH_INTERVAL*1000);

    });

    /**
    * Function will be used to cycle the images and gifs.
    */
    function cycleImages() {
        if(imageNum >= backgrounds.length) {
            imageNum = 0;
        }
            
        $("#background").css('background-image',"url("+backgrounds[Math.floor(Math.random()*backgrounds.length)]+")" );
        $("#background").fadeIn(300);
        imageNum++;
    }


    /**
    * Function will be used to preload the images into the browser cache.
    */
    function preloadImages(array) {
            if (!preloadImages.list) {
                    preloadImages.list = [];
            }
            var list = preloadImages.list;
            for (var i = 0; i < array.length; i++) {
                    var img = new Image();
                    img.onload = function() {
                            var index = list.indexOf(this);
                            if (index !== -1) {
                                    // remove image from the array once it's loaded
                                    // for memory consumption reasons
                                    list.splice(index, 1);
                            }
                    }
                    list.push(img);
                    img.src = array[i];
            }
    }

    /**
    * Function is used to update the date time.
    */
    function updateDateTime() {
        getTime();
    }

    /**
    * Function is used to initialize the all feeds and info.
    */
    function initialize() {
        makeData();
        updateDateTime();
        initImages();
        cycleImages();
    }

    /**
    * Function is used to fetch your custom data and build it.
    */
    function makeData() {
        addRowToTable('Update Me', 'Please');
        makeSamplePlot();
//        $.ajax({
//            url: '',
//            success: function(results){
//                addRowToTable('Update Me', 'Please');
//                makeSamplePlot();
//            }
//        });
    }

    function makeSamplePlot() {

        var trace2 = {
            x: [1, 2, 3, 4, 5],
            y: [3, 16, 5, 11, 9],
            mode: 'lines',
            line: { color: '#39b9e0', width: 3 },
            type: 'scatter',
            name: 'data points',
            connectgaps: true,
        };

        Plotly.newPlot('chart', [trace2], {
            title: 'Plot Title',
            xaxis_title: 'x Axis Title',
            yaxis_title: 'y Axis Title',
            font: {
                size: 16,
                color: '#bfbfbf',
            },
            autosize: true,
            showlegend: false,
            yaxis: {
                title: 'Y Axis',
                font: {
                    size: 14,
                },
                fixedrange: true,
                showgrid: true,
                showline: true,
                gridcolor: '#113a7f',
                gridwidth: 1,
                linecolor: '#2a93fe',
                linewidth: 2,
                tickfont : {
                    size : 14,
                    color : '#80e3ea',
                },
            },
            xaxis: {
                title: 'X Axis',
                font: {
                    size: 14,
                },
                showgrid: true,
                gridcolor: '#113a7f',
                gridwidth: 1,
                showline: true,
                linecolor: '#2a93fe',
                linewidth: 2,
                tickfont : {
                    size : 14,
                    color : '#80e3ea',
                },  
            },
            plot_bgcolor: 'rgba(0, 0, 0, 0)',
            paper_bgcolor: 'rgba(0, 0, 0, 0)',
        });
    }

    /**
    * Function builds a table row.
    **/
    function addRowToTable(val, lbl) {
        var row     = document.createElement('tr');
        var value   = document.createElement('td');
        var label   = document.createElement('td');

        value.className     = 'value';
        value.textContent   = val;
        label.className     = 'label accented';
        label.textContent   = lbl;
        row.appendChild(value);
        row.appendChild(label);
        document.getElementById('info').appendChild(row);
    }

    /**
    * Function will be used to initialize the images.
    */
    function initImages() {
        for(var i=0; i < BACKGROUND_FILES.length; i++) { 
            backgrounds.push("./backgrounds/"+BACKGROUND_FILES[i]);
        }
        preloadImages(backgrounds);
    }

    /**
    * Function will be used to initialize the months dictionary.
    */
    function initMonths() {
        var dict = {};
        
        dict['0'] = "January";
        dict['1'] = "February";
        dict['2'] = "March";
        dict['3'] = "April";
        dict['4'] = "May";
        dict['5'] = "June";
        dict['6'] = "July";
        dict['7'] = "August";
        dict['8'] = "September";
        dict['9'] = "October";
        dict['10'] = "November";
        dict['11'] = "December";
        
        return dict;
    }

    /**
    * Function will be used to initialize the days dictionary.
    */
    function initDays() {
        var dict = {};

        dict['0'] = "Sun";
        dict['1'] = "Mon";
        dict['2'] = "Tues";
        dict['3'] = "Weds";
        dict['4'] = "Thurs";
        dict['5'] = "Fri";
        dict['6'] = "Sat";
        
        return dict;
    }

    /**
    * Function is used to retrieve the current time.
    * It will also format it.
    */
    function getTime() {
        for (var timeObj of TIMES) {
            var date =  new Date(
                new Date().getTime() + timeObj.timezone * 3600 * 1000
            );
            var hour = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var writtenDate = makeDate(date);

            if (hour < 10) { hour = "0"+hour; }
            if (minutes < 10) { minutes = "0"+minutes; }
            if (seconds < 10) { seconds = "0"+seconds; }

            var time = hour+":"+minutes;
            makeTimeBoxes(writtenDate, time, seconds, timeObj.place, timeObj.id);
        }
    }

    function makeTimeBoxes(writtenDate, time, seconds, place, id) {
        if (document.getElementById(id+'-clock')) {
            document.getElementById(id+'-time').textContent = time;
            document.getElementById(id+'-seconds').textContent = seconds;
            document.getElementById(id+'-date').textContent = writtenDate;
        }
        else {
            var timeHolder = document.createElement("div");
            timeHolder.className = "clock box";
            timeHolder.id = id+'-clock';
            var placeElm = document.createElement("div");
            placeElm.className = 'city';
            placeElm.textContent = place;
            var date = document.createElement("div");
            date.id = id+'-date';
            date.className = 'date accented';
            date.textContent = writtenDate;
            var timeline = document.createElement("div");
            timeline.className = 'time-line';
            var timeElm = document.createElement("div");
            timeElm.id = id+'-time';
            timeElm.textContent = time;
            timeElm.className = 'time';
            var secondsElm = document.createElement("div");
            secondsElm.id = id+'-seconds';
            secondsElm.className = 'seconds accented';
            secondsElm.textContent = seconds;
            timeline.appendChild(timeElm);
            timeline.appendChild(secondsElm);
            timeHolder.appendChild(placeElm);
            timeHolder.appendChild(date);
            timeHolder.appendChild(timeline);
            document.getElementById('header').appendChild(timeHolder);
        }
    }
    
    /**
    * Function is used to retrieve the current date.
    * It will also format it.
    */
    function makeDate(date) {
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        var dow = date.getDay();
        var dows = initDays();
        var months = initMonths();

        if(day < 10)
        {
            day = "0"+day;
        }

        month = months[month];
        dow = dows[dow];

        return dow+", "+month+" "+day+", "+year;
    }
