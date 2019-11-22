// Modules to control application life and create native browser window, also contains displaywindow functions
const {app, BrowserWindow, screen, ipcMain} = require('electron')
const path = require('path')
var axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');	
var sorttype = "new"


let mainWindow
let overlayWindow



function createWindow () { //inits

 
let activehintid
let display = screen.getPrimaryDisplay();
let width = display.bounds.width;
let height = display.bounds.height;
  mainWindow = new BrowserWindow({
	  //creates the window in the bottom right corner where hints are displayed
    width: 300, 
    height: 500, 
	frame:false,
	alwaysOnTop: true,
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
	  webPreferences: {
      preload: path.join(__dirname, 'preload.js') 	  
		}
	  
	  
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
	
	axios.put('https://hawkshot.herokuapp.com/?'.concat("hints=",activehintid,"/helpful"));	
}

function addfunny(event)

{
	axios.put('https://hawkshot.herokuapp.com/'.concat("hints=",activehintid,"/funny"));
}



function funnyhint(event)
{
	//displays a funny hint with current cardID and sort
	document.getElementById("currcard").textContent = localStorage.getItem('currentcardID'); //this line pulls the cardID from localstorage, line below prints get request url for testing
	console.log('http://hawkshot.herokuapp.com/api/hints?'.concat("cardId=",document.getElementById("currcard").textContent,"&limit=1&sortCat=funny&sortBy=",sorttype));
	axios.get('http://hawkshot.herokuapp.com/api/hints?'.concat("cardId=",document.getElementById("currcard").textContent,"&limit=1&sortCat=funny&sortBy=",sorttype)).then((response) =>
	{
		console.log(JSON.stringify(response));
		console.log(response.data.hints[0].content);
		document.getElementById("hint").textContent = response.data.hints[0].content;
		document.getElementById("funnyvotes").textContent = "Funny Votes: " + response.data.hints[0].funny;
		activehintid = response.id
	});	
	
	
	
}

function helpfulhint(event)
{
	//displays a helpful with current cardID and sort
	document.getElementById("currcard").textContent = localStorage.getItem('currentcardID'); //this line pulls the cardID from localstorage, line below prints get request url for testing
	console.log('http://hawkshot.herokuapp.com/api/hints?'.concat("cardId=",document.getElementById("currcard").textContent,"&limit=1&sortCat=helpful&sortBy=",sorttype));
	axios.get('http://hawkshot.herokuapp.com/api/hints?'.concat("cardId=",document.getElementById("currcard").textContent,"&limit=1&sortCat=helpful&sortBy=",sorttype)).then((response) =>
	{
		document.getElementById("hint").textContent = response.data.hints[0].content;
		document.getElementById("helpfulvotes").textContent = "Helpful Votes: " + response.data.hints[0].helpful;
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




