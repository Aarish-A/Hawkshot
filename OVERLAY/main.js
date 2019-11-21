// Modules to control application life and create native browser window
const {app, BrowserWindow, screen} = require('electron')
const path = require('path')
var axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');	
const request = require('request');	
const { ipcMain } = require('electron');
const { ipcRenderer } = require('electron');
let activehintid;

//TODO (in order):
//fix eventlistener bug (I have no idea why that isn't working, check display.html)
//fix get request format if it isn't accurate
//add auth for client voting if needed
//add client voting post requests

let mainWindow
let overlayWindow
let sorttype = "/new/" 


function createWindow () {



let display = screen.getPrimaryDisplay();
let width = display.bounds.width;
let height = display.bounds.height;
  mainWindow = new BrowserWindow({
	  //creates the window in the bottom right corner where hints are displayed
    width: 300, 
    height: 500, 
	frame:false,
	x: width - 300,
	y: height-500,                
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') 	  
		}	 
  })
  
  //creates the overlaywindow that covers the screen and records mouse movements
  overlayWindow = new BrowserWindow ({
	  width: width,
	  height: height,
	  alwaysOnTop: true,
	  transparent : true,
	  frame: false,
	  
		
	  
	  
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  overlayWindow.loadFile('overlay.html')
  overlayWindow.setIgnoreMouseEvents(true, { forward: true }) 
  //allows you to click through the overlayWindow and actually interact with the game
  


  mainWindow.on('closed', function () {
    mainWindow = null
  })
  
  overlayWindow.on('closed', function () {
    overlayWindowWindow = null
  })
}
//VOTING IN CLIENT TO BE ADDED IN FUTURE UPDATE

function addhelpful()

{
	
	
	axios.put('https://hawkshot.herokuapp.com/'.concat(activehintid,"helpfulVotes"))

	
}

function addfunny ()

{
	
	
	
	axios.put('https://hawkshot.herokuapp.com/'.concat(activehintid,"funnyVotes"))
	
	
}


//get requests from api: assuming format of url/cardID/sorttype (helpful,funny,new) /previous if previous
//change if needed, at time of writing api isn't up on heroku

function funnyhint()

{
	//displays a funny hint with current cardID and sort
	document.getElementById("hint").textContent = "hint cycled";
	axios.get('http://localhost:5000/'.concat("cardId=",document.getElementById("currcard").textContent,"/limit=1/sortCat=Funny/sortby=",sorttype)).then((response) =>
	{
		document.getElementById("hint").textContent = response.content
		activehintid = response.id
	});	
	
	
	
}

function helpfulhint()

{
	//displays a helpful with current cardID and sort
	document.getElementById("hint").textContent = "hint cycled back";
	axios.get('http://localhost:5000/'.concat("cardId=",document.getElementById("currcard").textContent,"/limit=1/sortCat=Funny/sortby=",sorttype)).then((response) =>
	{
		document.getElementById("hint").textContent = response.content
		activehintid = response.id
	})
	
	
	
}

//the next 3 functions just change the sort type, nothing too fancy
function sorthelpful()

{
	sorttype = "helpful"
	
	
}

function sorttrending()

{
	sorttype = "trending"
	
	
}


function sortnew()

{
	sorttype = "new"
	
	
}

function readhover(event) //gets the x and y positions of the mouse, then runs getcardcode with those positions
{

	var positionobject;
	var xpos = event.screenX;
	var ypos = event.screenY;
axios.get('http://localhost:21337/positional-rectangles').then((response) =>
	{	
	positionobject = response
	document.getElementById("name").textContent = getcardcode(positionobject, xpos, ypos);
	
	
	});

}

function getcardcode(positions, x, y) //takes in the positional-rectangles call
//and determines which cardID a given x and y value correspond to

{
	var cardcode = document.getElementById("name").textContent 
	//since readhover updates the title of the overlayWindow, this allows us to access the previous function call
	for (z = 0; z < parseInt(positions.data.Rectangles.length); z++)
	{
		if((x > positions.data.Rectangles[z].TopLeftX) && (x < positions.data.Rectangles[z].TopLeftX + positions.data.Rectangles[z].Width)
			&& (y < positions.data.Rectangles[z].TopLeftY) && (y > positions.data.Rectangles[z].TopLeftY - positions.data.Rectangles[z].Height))
			{
				cardcode = positions.data.Rectangles[z].CardCode;
				break;
			}
		
	}
	console.log(cardcode,x,y); //for testing
	 
	return cardcode;	
	
}


ipcMain.on('sendcardID', (event, arg) => {
    //on receiving an ipc message from the overlayWindow, sends it to the display window 
    mainWindow.webContents.send('updatecardID', arg);
});



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})




