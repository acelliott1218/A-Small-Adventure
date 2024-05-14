const textElement = document.getElementById("text");
const dialogueElement = document.getElementById("dialogue")
const imageElement = document.getElementById("image")
const optionButtonsElement = document.getElementById("option-buttons")

let state = {}
let inventory = ['pocket lint']

//**starts the game when called */ 
function startGame() {
    state = {}
    showTextNode(1)
}

//**shows a particular text node in relation to user input, while hiding others */
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    console.log(textNode)
    textElement.innerHTML = textNode.text;
    dialogueElement.innerHTML = textNode.dialogue
    imageElement.innerHTML = textNode.image;
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerHTML = option.text;
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

//**reveals options on click if the correct conditions are met */
function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

//**Allows users to select options, harmonizes user choices */
function selectOption(option) {
    const nextTextNodeId = option.nextText
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

//**this function is called when new items are added to the inventory */ 
function addInventory(a) {
    inventory.push(a)
}

//**this function is called when items are removed from the inventory, credit to mss for initial code https://stackoverflow.com/questions/65794581/array-function-with-indexof-and-splice */ 
function delItem(a) {
    i = inventory.indexOf(a);

    if (i !== -1) {
        inventory.splice(i, 1);
    } else {
        return null
    }
}

/**shows the acquired items in the player's inventory on the other page */
function showItem(a) {
    document.getElementById(a).style.visibility = "visible"
}

/**hides the acquired items again, usually after they've been expended */
function hideItem(a) {
    document.getElementById(a).style.visibility = "hidden"
}
// this variable acts sort of like a function, but is required to circumvent excessive "if-else" statements. 
// It's on this line to help the flow/readability of the code
const textNodes = [{
        id: 1,
        text: 'You\'ve arrived as a stranger in a strange land. On the floor in front of you, however, there\'s a golden coin. An old man points it out to you, saying...',
        image: '<img src="assets/images/oldman.jpg" alt="An old man">',
        dialogue: `<h2 class="title">Hello there!</h2> <br> <p class="title">You're not from around here, so I'll warn you; not picking up a coin's bad luck.</p>`,
        options: [
            // these are the first stage of the game
            {
                text: `<p onclick="addInventory('coin'),showItem('coin')">Take the coin from the ground</p>`,
                setState: {
                    coin: true,
                    gotCoin: true,
                    noGrove: true
                },
                nextText: 2,
            },
            {
                text: 'Ignore the coin',
                setState: {
                    badLuck: true,
                    hadBadLuck: true,
                    noGrove: true
                },
                nextText: 2,
            }
        ]
    },
    {
        // the crossroads, aka the last part of the story that's just intro
        id: 2,
        text: 'As quickly as you make your decision, the old man vanishes. Alone once more, you notice a fork in the road: one path leads to a castle, the other to the woods.',
        image: '<img src="assets/images/fork.jpg" alt="A fork in the road">',
        dialogue: `<p class='title'>A lingering doubt remains in your mind, how real truly is luck in this place?</p>`,
        options: [{
                text: 'Head towards the forest',
                setState: {
                    forest: true
                },
                nextText: 3,
            },
            {
                text: 'Head towards the castle',
                setState: {
                    castle: true
                },
                nextText: 4
            },
            {
                text: 'Turn back towards town',
                requiredState: (currentState) => currentState.noGrove,
                setState: {
                    grove: true
                },
                nextText: 5
            }
        ]
    },
    {
        // this is the forest scene, so every nexttext with 6-7 are related to it
        id: 3,
        text: `You head into the forest, and it seems the instant you entered the wilderness, the trees seem to close behind you like a fortress gate.
         <br> As you keep trudging forwards, you start to hear whispers, growing louder until a voice, one with no speaker, addresses you directly.`,
        image: '<img src="assets/images/forestpath.jpg" alt="An overgrown path in a dense forest, which seems to close in on you.">',
        dialogue: `<h2 class="title">Stop!</h2> <br> <p class="title">This is no place for the uninitiated, traveler. Do you have any charms, any protection?</p>`,
        options: [{
                text: `<p onclick="delItem('coin'),hideItem('coin')">A charm? Like this coin?</p>`,
                requiredState: (currentState) => currentState.coin,
                nextText: 6,
                setState: {
                    coin: false
                }
            },
            {
                text: `I got a charm from the grove, I'll be fine!`,
                requiredState: (currentState) => currentState.charm,
                nextText: 6
            },

            {
                text: `I really should've listened to that old man... (Run for it!)`,
                nextText: -1,
                setState: {
                    ranAway: true,
                    died: true
                }
            }
        ]
    },
    {
        id: 4,
        text: `The closer to the castle you get, the more your surroundings...change. More and more, everything but the castle reminds you of an expressionist painting. 
            <br> when you finally reach the castle, a guard stops you.`,
        image: '<img src="assets/images/guard.jpg" alt="A guard in front of a castle, so foggy that you can only make out him and the castle behind him.">',
        dialogue: `<h2 class="title">Halt!</h2> <br> <p class="title">For the residents' safety, entry is barred for all but the blessed. Where is your charm?</p>`,
        options: [{
                text: `<p onclick="delItem('coin'),hideItem('coin')">Maybe I can just pay an entry fee?</p>`,
                requiredState: (currentState) => currentState.coin,
                setState: {
                    coin: false
                },
                nextText: 7
            },
            {
                text: 'I actually just got a charm from the grove, see?',
                requiredState: (currentState) => currentState.charm,
                nextText: 7,
                setState: {
                    charm: true
                }
            },
            {
                text: `I'm getting in there one way or another! (fight)`,
                nextText: 7,
                setState: {
                    foughtGuard: true,
                }
            },
            {
            text: `I'm getting in there one way or another! (fight)`,
            nextText: -1,
            requiredState:(currentState) => currentState.badLuck,
            setState: {
                foughtGuard: true,
                died: true
            }
        }
        ],
    },
    {
        // this is the grove scene, and will take the player back to the crossroads.
        id: 5,
        text: `You decide to head back towards town, maybe the old man is there somewhere? But as you do so, you see an empty grove.`,
        image: 'placeholder',
        dialogue: `You're alone with your thoughts, you're sure of it...but then there's an amulet on the ground. What do you do?`,
        options: [{
                text: `<p onclick="addInventory('charm'),showItem('charm')"">Pick up the amulet</p>`,
                nextText: 2,
                setState: {
                    charm: true,
                    goodLuck: true,
                    badLuck: false,
                    pickedUpCharm: true,
                    wentToGrove: true,
                    noGrove: false
                }
            },
            {
                text: `Ignore it, that thing could be dangerous!`,
                nextText: 2,
                setState: {
                    badLuck: true,
                    pickedUpCharm: false,
                    wentToGrove: true,
                    noGrove: false
                }
            }
        ]
    },
    {
        id: 6,
        text: `<p>Satisfied you're safe, at least safe enough, to enter deeper into the forests, the voices subside. Suddenly, the life of a forest returns!</p>`,
        image: 'placeholder',
        dialogue: `<p>Though heavily wooded, the unnerving forest in front of you would merit exploration. What should you do?</p>`,
        options: [{
                text: `<p>Let's play it safe, I'm outta here!</p>`,
                nextText: 4,
                setState: {
                    noExplore: true
                },
            },
            {
                text: `<p>This place warrants some exploring, let's check it out!</p>`,
                nextText: -1,
                setState: {
                    died: true,
                    explored: true
                },
                requiredState: (currentState) => currentState.badLuck
            },
            {
                text: `<p>This place warrants some exploring, let's check it out!</p>`,
                nextText: 8,
                setState: {
                    explored: true
                },
            },
        ]
    },
    // placeholder templates below this line
    {
        id: 7,
        text: `<p>The guard lets you past, and after entering the blur increases to such a point that you can't see any of the castle's surroundings. With no other options, you decide to enter the castle.</p>`,
        image: `placeholder`,
        dialogue: `<p>Once inside the castle, you seem to be totally alone. Weren't there supposed to be other people here? Something's up...</p>`,
        options: [{
                text: `<p>If anywhere in here has people, it's gonna be the throne room.</p>`,
                nextText: 9,
                setState: {
                    metKing: true
                }
            },
            {
                text: `<p>Let's check the kitchen, I'm getting hungry.</p>`,
                nextText: 10,
            },
            {
                text: `<p>I'm tired, let's find somewhere to sleep</p>`,
                requiredState: (currentState) => currentState.badLuck,
                setState: {
                    died: true
                },
                nextText: -1,
            },
            {
                text: `<p>I'm tired, let's find somewhere to sleep</p>`,
                nextText: 11,
            }
        ]
    },
    {
        id: 0,
        text: ``,
        image: 'placeholder',
        dialogue: ``,
        options: [{
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
        ]
    },
    {
        id: 0,
        text: ``,
        image: 'placeholder',
        dialogue: ``,
        options: [{
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
        ]
    },
    {
        id: 0,
        text: ``,
        image: 'placeholder',
        dialogue: ``,
        options: [{
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
        ]
    },
    {
        id: 0,
        text: ``,
        image: 'placeholder',
        dialogue: ``,
        options: [{
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
        ]
    },
    {
        id: 0,
        text: ``,
        image: 'placeholder',
        dialogue: ``,
        options: [{
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
        ]
    },
    {
        id: 0,
        text: ``,
        image: 'placeholder',
        dialogue: ``,
        options: [{
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
        ]
    },
    {
        id: 0,
        text: ``,
        image: 'placeholder',
        dialogue: ``,
        options: [{
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
        ]
    },
    {
        id: 0,
        text: ``,
        image: 'placeholder',
        dialogue: ``,
        options: [{
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
        ]
    },
    {
        id: 0,
        text: ``,
        image: 'placeholder',
        dialogue: ``,
        options: [{
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
        ]
    },
    {
        id: 0,
        text: ``,
        image: 'placeholder',
        dialogue: ``,
        options: [{
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
        ]
    },
    {
        id: 0,
        text: ``,
        image: 'placeholder',
        dialogue: ``,
        options: [{
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
        ]
    },
    {
        id: 0,
        text: ``,
        image: 'placeholder',
        dialogue: ``,
        options: [{
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
        ]
    },
    {
        id: 0,
        text: ``,
        image: 'placeholder',
        dialogue: ``,
        options: [{
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
            {
                text: `<p></p>`,
                nextText: 2,
                setState: {},
                requiredState: (currentState) => currentState.state
            },
        ]
    },
]
// end everything with this square bracket, don't let it move
startGame()

// this is code to be added once I finish the story out
// id:300
// text: `In this world of chance, the lucky thrive and the unlucky...well, you just found out. Perhaps another <p color:blue;><a href=index.html>roll of the dice?</a></p>`