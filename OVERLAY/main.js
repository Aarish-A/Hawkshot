// Modules to control application life and create native browser window
const {app, BrowserWindow, screen, ipcMain} = require('electron')
const path = require('path')
var axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');	
const request = require('request');	



//TODO (in order):
//fix eventlistener bug (I have no idea why that isn't working, check display.html)
//fix get request format if it isn't accurate
//add auth for client voting if needed
//add client voting post requests

let mainWindow
let overlayWindow




function createWindow () {

let sorttype = "/new/" 
let activehintid
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

function addhelpful(event)

{
	axios.put('https://hawkshot.herokuapp.com/'.concat(activehintid,"/helpfulVotes"));	
}

function addfunny(event)

{
	axios.put('https://hawkshot.herokuapp.com/'.concat(activehintid,"/funnyVotes"));
}


//get requests from api: assuming format of url/cardID/sorttype (helpful,funny,new) /previous if previous
//change if needed, at time of writing api isn't up on heroku

function funnyhint(event)
{
	//displays a funny hint with current cardID and sort
	document.getElementById("hint").textContent = "No funny hints available"
	axios.get('http://localhost:5000/'.concat("cardId=",document.getElementById("currcard").textContent,"/limit=1/sortCat=Funny/sortby=",sorttype)).then((response) =>
	{
		document.getElementById("hint").textContent = response.content;
		activehintid = response.id
	});	
	
	
	
}

function helpfulhint(event)
{
	//displays a helpful with current cardID and sort
	document.getElementById("hint").textContent = "No helpful hints available";
	axios.get('http://localhost:5000/'.concat("cardId=",document.getElementById("currcard").textContent,"/limit=1/sortCat=Funny/sortby=",sorttype)).then((response) =>
	{
		document.getElementById("hint").textContent = response.content;
		activehintid = response.id
	});
	
	
	
}

//the next 3 functions just change the sort type, nothing too fancy
function sortpopular(event)
{
	sorttype = "popular"
	console.log(sorttype);
	
	
}

function sorttrending(event)
{
	sorttype = "trending"
	console.log(sorttype);
	
	
}


function sortnew(event)

{
	sorttype = "new"
	console.log(sorttype);
	
	
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




