const textElement = document.getElementById("text");
const dialogueElement = document.getElementById("dialogue")
const imageElement = document.getElementById("image")
const optionButtonsElement = document.getElementById("option-buttons")

let state = {}

//**starts the game when called */ 
function startGame(){
    state = {}
    showTextNode(1)
}

//**shows a particular text node in relation to user input, while hiding others */
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    textElement.innerHTML = textNode.text;
    dialogueElement.innerHTML = textNode.dialogue
    imageElement.innerHTML = textNode.image;
    while (optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }
    textNode.options.forEach(option =>{
        if (showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text;
            button.classList.add('btn')
            button.addEventListener('click',() => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}


//**reveals options on click if the correct conditions are met */
function showOption(option){
    return option.requiredState == null || option.requiredState(state);
}

//**Allows users to select options, harmonizes user choices */
function selectOption(option){
    const nextTextNodeId = option.nextText;
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}


// this variable acts sort of like a function, but is required to circumvent excessive "if-else" statements. 
// It's on this line to help the flow/readability of the code
const textNodes = [
    {
        id: 1,
        text: 'You\'ve arrived as a stranger in a strange land. On the floor in front of you, however, there\'s a golden coin. An old man points it out to you, saying...',
        image: '<img src="assets/images/oldman.jpg" alt="An old man">',
        dialogue: `<h2 class="title">Hello there!</h2> <br> <p class="title">You're not from around here, so I'll warn you; not picking up a coin's bad luck.</p>`,
        options: [
            // these are the first stage of the game
            {
                text: 'Pick up the coin',
                setState:{coin: true},
                nextText: 2,
            },
            {
                text: 'Ignore the coin',
                setState:{badLuck: true},
                nextText: 2,
            }
        ]
    },
    {
        id: 2,
        text:'As quickly as you make your decision, the old man vanishes. Alone once more, you notice a fork in the road: one path leads to a castle, the other to the woods.',
        image: '<img src="assets/images/fork.jpg" alt="A fork in the road">',
        dialogue: `<p class='title'>A lingering doubt remains in your mind, how real truly is luck in this place?</p>`,
        options: [
            {
                text: 'Head towards the forest',
                setState: {forest: true},
                nextText: 3
            },
            {
                text: 'Head towards the castle',
                setState: {castle: true},
                nextText: 4
            },
            {
                text: 'Turn back towards town',
                setState: {grove:true},
                nextText: 5
            }
        ]
    },
    {
        id: 3,
        text: `You head into the forest, and it seems the instant you entered the wilderness, the trees seem to close behind you like a fortress gate.
         <br> As you keep trudging forwards, you start to hear whispers, growing louder until a voice, one with no speaker, addresses you directly.`,
        image: '<img src="assets/images/forestpath.jpg" alt="An overgrown path in a dense forest, which seems to close in on you.">',
        dialogue: `<h2 class="title">Stop!</h2> <br> <p class="title">This is no place for the uninitiated, traveler. Do you have any charms, any protection?</p>`,
        options: [
            {
                text: 'A charm? Uhh, like this coin?',
                requiredState: (currentState) => currentState.coin,
                nextText: 6
            },
            {
                text: `I got a charm from the grove, I'll be fine!`,
                requiredState: (currentState) => currentState.charm,
                nextText: 7
            },
            {
                text: `I really should've listened to that old man... (Run for it!)`,
                nextText: 8
            }
        ]
    },
    {
        id: 4,
        text: `The closer to the castle you get, the more your surroundings...change. More and more, everything but the castle reminds you of an expressionist painting. 
        <br> when you finally reach the castle, a guard stops you.`,
        image: '<img src="assets/images/guard.jpg" alt="A guard in front of a castle, so foggy that you can only make out him and the castle behind him.">',
        dialogue: `<h2 class="title">Halt!</h2> <br> <p class="title">For the residents' safety, entry is barred for all but the blessed. Where is your charm?</p>`,
        options: [
            {
                text: 'Maybe I can just pay an entry fee?',
                requiredState:(currentState) => currentState.coin,
                nextText: 9
            },
            {
                text: 'I actually just got a charm from the grove, see?',
                requiredState:(currentState) => currentState.charm,
                nextText: 10
            },
            {
                text: `I'm getting in there one way or another! (fight)`,
                requiredState:(currentState) => currentState.coin,
                nextText: 11
            }
        ],
    },
]

startGame()