const textElement = document.getElementById("text");
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
    textElement.innerText = textNode.text;
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
        text: 'Whoa, blue goo!',
        options: [
            // these are the first stage of the game
            {
                text: 'Take the goo',
                setState:{blueGoo: true},
                nextText: 2,
            },
            {
                text: 'Leave the goo',
                nextText: 2,
            }
        ]
    },
    {
        id: 2,
        text:'You venture forth in search of answers to where you are when you come across a merchant',
        options: [
            {
                text: 'Trade the goo for a sword',
                // requires the user to have taken the blue goo
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo: false, sword: true},
                nextText: 3
            },
            {
                text: 'Trade the goo for a shield',
                // requires the user to have taken the blue goo
                requiredState: (currentState) => currentState.blueGoo,
                setState:{blueGoo: false, shield: true},
                nextText: 3
            },
            {
                // this is the option if the user has no goo to trade
                text: 'Ignore the merchant',
                setState:{blueGoo: false, sword: true},
                nextText: 3,
            }
        ]
    },
    {
        id: 3,
        text: 'After leaving you find a castle',
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
        options: [
            {
                text: 'Retry?',
                nextText: 1
            }
        ],
    },
]

startGame()