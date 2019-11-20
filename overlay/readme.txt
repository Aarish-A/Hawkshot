This is the electron app that interacts with the client.
It's made up of 2 windows: 
1. Display window in the corner with the buttons that allows you to display hints
2. An invisible window that covers the whole screen and records mousemovement so the app knows what cards you're hovering over
(does not record clicks because electron does not have a way to record clicks while passing them through to windows below)