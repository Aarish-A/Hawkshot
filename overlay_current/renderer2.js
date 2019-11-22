var axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');
const { ipcRenderer } = require('electron')



function readhover(event) //gets the x and y positions of the mouse, then runs getcardcode with those positions
{
	
	
	var positionobject;
	var xpos = event.screenX;
	var ypos = event.screenY;

axios.get('http://localhost:21337/positional-rectangles').then((response) =>
	{	

	positionobject = response
	document.getElementById("name").textContent = getcardcode(positionobject, xpos, ypos);
	localStorage.setItem('currentcardID', document.getElementById("name").textContent);
	
	
	
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