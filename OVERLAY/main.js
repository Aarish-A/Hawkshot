// Modules to control application life and create native browser window
const {app, BrowserWindow, screen} = require('electron')
const path = require('path')
var axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');	
const request = require('request');	
const ipc = require('electron').ipcRenderer;


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let overlayWindow


function createWindow () {

let display = screen.getPrimaryDisplay();
let width = display.bounds.width;
let height = display.bounds.height;
  //var screenyoink = JSON.parse(axios.get('http://localhost:21337/positional-rectangles'));
  mainWindow = new BrowserWindow({
	  
    width: 300, 
    height: 500, 
	frame:false,
	x: width - 300,
	y: height-500,
	//setIgnoreMouseEvents:true,
                
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
	  
	  
    }
	
	
	 
  })
  
  
  overlayWindow = new BrowserWindow ({
	  width: width,
	  height: height,
	  alwaysOnTop: true,
	  transparent : true,
	  frame: false,
	  
		
	  
	  
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  overlayWindow.loadFile('display.html')
  overlayWindow.setIgnoreMouseEvents(true, { forward: true })
  

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  
  overlayWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    overlayWindowWindow = null
  })
}

function addhelpful()

{
	console.log("bruh");
	
	//axios.post('https://hawkshot.herokuapp.com//')
	//POST ID WITH PARAMETER HELPFUL
	
}

function addfunny ()

{
	
	
	
	//axios.post('https://hawkshot.herokuapp.com//')
	
	//POST ID WITH PARAMETER FUNNY
}

function nexthint()

{
	
	document.getElementById("hint").textContent = "hint cycled";
	//axios.get('https://hawkshot.herokuapp.com//')
	//NEXT HINT
	
	
}


function readhover(event)
{

	
	var positionobject;
	var xpos = event.screenX;
	var ypos = event.screenY;
axios.get('http://localhost:21337/positional-rectangles').then((response) =>
	{	
	positionobject = response
	
	//console.log(JSON.stringify(positionobject.data.Rectangles[0].TopLeftX) + JSON.stringify(positionobject.data.Rectangles[0].Width) + " "+xpos+ " " + ypos);
	//console.log(xpos+1);
	document.getElementById("name").textContent = getcardcode(positionobject, xpos, ypos);
	
	
	});
	
}

function getcardcode(positions, x, y)

{
	var cardcode = "none"
	
	
	
	for (z = 0; z < parseInt(positions.data.Rectangles.length); z++)
	{
		if((x > positions.data.Rectangles[z].TopLeftX) && (x < positions.data.Rectangles[z].TopLeftX + positions.data.Rectangles[z].Width)
			&& (y < positions.data.Rectangles[z].TopLeftY) && (y > positions.data.Rectangles[z].TopLeftY - positions.data.Rectangles[z].Height))
			{
				cardcode = positions.data.Rectangles[z].CardCode;
				break;
			}
		
	}
	console.log(cardcode,x,y);
	 
	return cardcode;
	
	
	
}


function throttle(callback, limit, time) {
    /// monitor the count
    var calledCount = 0;

    /// refresh the `calledCount` varialbe after the `time` has been passed
    setInterval(function(){ calledCount = 0 }, time);

    /// creating a closure that will be called
    return function(){
        /// checking the limit (if limit is exceeded then do not call the passed function
        if (limit > calledCount) {
            /// increase the count
            calledCount++;
            callback(); /// call the function
        } 
        else console.log('not calling because the limit has exceeded');
    };
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


