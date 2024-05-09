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
        image: '<img src="assets/images/new years.jpg" alt="An old man">',
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
        text:'You venture forth in search of answers to where you are when you come across a merchant',
        image: '<img src="assets/images/new years.jpg" alt="An old man">',
        dialogue: `<h2 class="title">Hello there!</h2> <br> <p class="title">You're not from around here, so I'll warn you; not picking up a coin's bad luck.</p>`,
        options: [
            {
                text: 'Trade the goo for a sword',
                // requires the user to have taken the blue goo
                requiredState: (currentState) => currentState.coin,
                setState: {coin: false, sword: true},
                nextText: 3
            },
            {
                text: 'Trade the goo for a shield',
                // requires the user to have taken the blue goo
                requiredState: (currentState) => currentState.coin,
                setState:{coin: false, shield: true},
                nextText: 3
            },
            {
                // this is the option if the user has no goo to trade
                text: 'Ignore the merchant',
                setState:{coin: false, badLuck:true, sword: false},
                nextText: 3,
            }
        ]
    },
    {
        id: 3,
        text: 'After leaving you find a castle',
        image: '<img src="assets/images/new years.jpg" alt="An old man">',
        dialogue: `<h2 class="title">Hello there!</h2> <br> <p class="title">You're not from around here, so I'll warn you; not picking up a coin's bad luck.</p>`,
        options: [
            {
                text: 'explore',
                nextText: 4
            },
            {
                text: 'find a room to sleep in',
                nextText: 5
            },
            {
                text:'sleep on the ground like some kind of animal',
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: 'You fall asleep and die',
        image: '<img src="assets/images/new years.jpg" alt="An old man">',
        dialogue: `<h2 class="title">Hello there!</h2> <br> <p class="title">You're not from around here, so I'll warn you; not picking up a coin's bad luck.</p>`,
        options: [
            {
                text: 'Retry?',
                nextText: 1
            }
        ],
    },
]

startGame()