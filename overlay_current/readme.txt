This is the electron app that interacts with the client.
It's made up of 2 windows: 
1. Display window in the corner with the buttons that allows you to display hints
2. An invisible window that covers the whole screen and records mousemovement so the app knows what cards you're hovering over
(does not record clicks because electron does not have a way to record clicks while passing them through to windows below)

Issues:
The invisible window cannot go on top of a fullscreen app, so it only works in windows mode
The invisible window assumes the game window is close to the size of the screen
Checking the current card id has some delay bc it triggers on mousemove
Voting in client is not functional yet bc accounts and votes are dependent on firebase,
which cannot be signed into via electron.
Before clicking a hint, you have to use the dropdown to select a sort mode