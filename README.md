# Bonsai Board

## What is it

The Bonsai Board is a heads display used to display information such as weather, news, and time. You can check it out live [here](http://johncos247.github.io/bonsai_board/index.html).

> __Note:__ Due to deprecation of the google rss api I am investigating alternatives. For the time being that functionality has been removed.

## Getting the Bonsai Board running.

To run the application just open the location of the index.html in your favorite browser. There is no need to run it on a server since the page is a static web page.

## Customizing the board

You can update the variables at the top of the script to customize the output. This variables include the following.

1) The RSS feed. __Deprecated Temporarily__

2) The city for the weather.

3) The interval to switch the images.

4) The backgrounds located in the backgrounds folder.

5) Flag to cycle images.


	var CITY = "Arlington, VA";           //City for the Weather
	var SWITCH_INTERVAL = 20;             //Set the number of seconds you want before switching images.
	var BACKGROUND_FILES = ['lake.gif'];  //Add new backgrounds here.
	var CYCLE_BACKGROUND = false;
	

These can be updated in the following file.

`bonsai_board/static/js/info_grabber.js`

