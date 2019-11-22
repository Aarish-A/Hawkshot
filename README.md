# Hawkshot

Hawkshot is a service allowing players to view, create, and vote on pop-up tips (now referred to as “hints”) about cards in-game. Hawkshot is comprised of two elements: a web application, where players can sign up by email to contribute and interact with hints from other users, and an in-game overlay where hints can appear over their corresponding card. 

## Trying it out
### Online
> http://hawkshot.herokuapp.com/
### In-Game
> A link to the .exe overlay can be found [here](https://drive.google.com/open?id=1J9SH8Wf5D_mv2n8n6hNBleGkcUSQpHDD)

## About

### What are Hints? 
Hints are weighted by two different metrics: ‘funny’ and ‘helpful’. Users can vote on hints they find useful - or just those they find funny enough to make them smile.

To help prevent abuse and offensive hints, an automatic filter censors profanities as they get posted to the database. Hints are also reportable by other users. Hints that receive a significant number of reports will be hidden and no longer accessible.

### Features

### Web Application
Users can sign up and sign in through Google Firebase, which handles authentication and data storage. Users can see lists of all cards along with associated hints contributed by other users. All requests are handled by our API built in Flask.

Hints can be queried by ‘popular’, ‘recent’ or ‘trending’. Users can also sort by a specific metric, either by the number of ‘funny’, ‘helpful’ or total votes. Users can query for a specific card by name using the top search bar.

Each hint displays the number of respective votes and a ‘report’ button on the side. Users can create their own hints by clicking the named button next to the search bar.

### In-Game Overlay
The overlay tracks the cursor position of the player and shows hints when associated cards are hovered, either in game or in the collection menu. Hint appearances can be enabled or disabled in settings, or filtered so that only certain types of hints will appear. 

The overlay is built using Electron, and also takes advantage of Google Firebase. Players can also upvote or report the hints in the overlay  , which will be updated for the web application as well. 

## Next Steps

* Add more features to in-game client
* Ability to see, delete or edit one’s own hints
* More comprehensive profanity filter
* Separating hints by who owns them (you vs. your opponent)
