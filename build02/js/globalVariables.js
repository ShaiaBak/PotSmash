// general
var score = 0;
var scoreText;
var scoreStyle = { font: "16px Courier", fill: "#ffffff" };
var scoreContent;

var music;

// lvl 2
var lvl2Pos = 1;

// lvl 3
var lvl3Pos = 1;
var doorUnlocked = false;
var finalObjectiveComplete = false;


// text
var lvl1ExitContent = 	["You should grab your treasure",
						" before you leave."];

var lvl2Content = 		["You have your treasure.",
						" But you forgot your shoes",
						" ...",
						" And you locked yourself out..."];

var lvl2ExitContent = 	["There's something smelly here...",
						"...",
						" Like useful footwear."];

var lvl3Content = 		["You set out on your adventure.",
						" But something draws you",
						" towards this place. ",
						" Maybe you'll find something.."];

var lvl3Entrance = 		["There's nothing out there for me."];

var lvl3DeadEnd = 		["These stairs lead into a wall...",
						" What's the point?"];

var lvl3Statue1 =		["You hear muffled crying",
						" ...",
						" There's a small crack in the statue."];

var lvl3Statue2 =		["You see a golden reflection",
						" ...",
						" It must be your imagination."];

var lvl3Attic = 		["It's locked.",
						" ...",
						" There's a cheesey key hole here..."];

var lvl3ExitContent =	["Pots need to be broke..."];

var statueStuckTxt = 	["Mmmph.. H-help.. I'm st-stuck too..",
						" Are you.. coming......... back?",
						" ...................................",
						" ...................................",
						" ...................................",
						" ...................................",
						" ...................................",
						" ...................................",
						" ...................................",
						" ...................................",
						" ...................................",
						" ..............................hello?"];