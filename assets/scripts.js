/*jshint esversion: 6 */

const textElement = document.getElementById("text");
const dialogueElement = document.getElementById("dialogue");
const imageElement = document.getElementById("image");
const optionButtonsElement = document.getElementById("option-buttons");

let state = {};
let inventory = ['pocket lint'];

/**
*starts the game when called
 */ 
function startGame() {
    state = {};
    showTextNode(1);
}

/***
 * shows a particular text node in relation to user input, while hiding others 
 * */
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    console.log(textNode);
    textElement.innerHTML = textNode.text;
    dialogueElement.innerHTML = textNode.dialogue;
    imageElement.innerHTML = textNode.image;
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerHTML = option.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.appendChild(button);
        }
    });
}

/**
*reveals options on click if the correct conditions are met
 */
function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

/**
 * Allows users to select options, harmonizes user choices 
 * */
function selectOption(option) {
    const nextTextNodeId = option.nextText;
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

/**
*this function is called when new items are added to the inventory
 */ 
function addInventory(a) {
    inventory.push(a);
}

/**
*this function is called when items are removed from the inventory, credit to mss for initial code https://stackoverflow.com/questions/65794581/array-function-with-indexof-and-splice 
*/ 
function delItem(a) {
    i = inventory.indexOf(a);

    if (i !== -1) {
        inventory.splice(i, 1);
    } else {
        return null;
    }
}

/**
 * shows the acquired items in the player's inventory on the other page 
*/
function showItem(a) {
    document.getElementById(a).style.visibility = "visible";
}

/** 
*hides the acquired items again, usually after they've been expended 
*/
function hideItem(a) {
    document.getElementById(a).style.visibility = "hidden";
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
                text: `<p>A charm? Like this coin?</p>`,
                requiredState: (currentState) => currentState.coin,
                nextText: 6,
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
                },
            },
        ],
    },
    {
        // this is the grove scene, and will take the player back to the crossroads.
        id: 5,
        text: `You decide to head back towards town, maybe the old man is there somewhere? But as you do so, you see an empty grove.`,
        image: 'placeholder',
        dialogue: `You're alone with your thoughts, you're sure of it...but then there's an amulet on the ground. What do you do?`,
        options: [{
                text: `<p onclick="addInventory('charm'),showItem('charm')">Pick up the amulet</p>`,
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
                text: `<p>Let's play it safe, I'm getting out of here! <br>(Go to castle)</p>`,
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
    {
        id: 7,
        text: `<p>After entering the blur increases to such a point that you can't see any of the castle's surroundings. With no other options, you decide to enter the castle.</p>`,
        image: `placeholder`,
        dialogue: `<p>You seem to be totally alone. Weren't there supposed to be other people here? Something's up...</p>`,
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
        // exploration scene
        id: 8,
        text: `As you venture deeper into the wilderness, you lose sight of the trail entirely. The voices return, indecipherable, and grow louder as you go deeper.`,
        image: 'placeholder',
        dialogue: `What should you do?`,
        options: [{
                text: `<p>There's no way back, I have no choice but to go further.</p>`,
                nextText: 12
            },
            {
                text: `<p>Try to listen to the voices more...</p>`,
                nextText: 13,
            },
        ]
    },
    {
        // throne-room scene
        id: 9,
        text: `As you enter the throne room, you find the first other person here since the guard. A sullen figure sits on the throne in front of you.`,
        image: 'placeholder',
        dialogue: `I can smell the old world on you, that chaos of untamed chance. Let me tell you, stranger, those charms are the only reason you've even survived thus far.`,
        options: [{
                text: `<p>I already got past your guards, now it's your turn!</p>`,
                nextText: 14,
                setState: {
                    usurper: true
                },
                requiredState: (currentState) => currentState.foughtGuard + currentState.coin + currentState.charm + currentState.foot + currentState.tooth + currentState.eye,

            },
            {
                text: `<p>Untamed chance? What do you mean?</p>`,
                nextText: 15,
            },
        ]
    },
    {
        // kitchen scene
        id: 10,
        text: `The kitchen, just like the previous room, is empty. You look around...`,
        image: 'placeholder',
        dialogue: `After getting a good look of things, you decide to...`,
        options: [{
                text: `<p onclick="showItem('tooth'),addInventory('tooth')">There's no food here, but they seem big on luck. Maybe that tooth could be useful?</p>`,
                nextText: 16,
                setState: {
                    tooth: true
                },
            },
            {
                text: `<p>Read an old recipe book</p>`,
                nextText: 16,
                setState: {
                    recipe: true
                },
            },

        ]
    },
    {
        // lucky castle wake-up scene
        id: 11,
        text: `Upon waking up, you find out one of your eyes is missing! Great way to wake up in the morning.`,
        image: 'placeholder',
        dialogue: `Do you try and find who did it, or will you continue exploring?`,
        options: [{
                text: `<p>Head to the throne room</p>`,
                nextText: 9,
            },
            {
                text: `<p>Head to the kitchen</p>`,
                nextText: 10,
            },
            {
                text: `<p>Forget exploring, I need to get my eye!</p>`,
                nextText: 17,
            },
        ]
    },
    // meeting the forest spirit
    {
        id: 12,
        text: `It's the second person you've ever met here, and it's hard to call it a "person". Before you stands a hulking beast, with a deer's skull for a head. Despite its appearance, though, you can tell it means no harm`,
        image: 'placeholder',
        dialogue: `The being says: "You're a long way from home, I can tell, but where you stand now is closer to home...though not quite. Fortune and misfortune live in opposite dimensions in most of this realm, but they merge here. That's the voice from before!"`,
        options: [{
                text: `<p>Wait, if things are by chance here, why did you tell me I needed a charm?</p>`,
                nextText: 18,
            },
            {
                text: `<p>Can I stay here forever?</p>`,
                nextText: 19,
            },
        ]
    },
    // voices scene
    {
        id: 13,
        text: `The voices become almost, but not quite, intelligable as you focus on listening. They sound like buzzing, growing louder and louder, at the same rate they become clear.`,
        image: 'placeholder',
        dialogue: `"I can almost understand what they're saying..."`,
        options: [{
                text: `<p>Keep listening, I'm so close!</p>`,
                nextText: 20,
                setState: {
                    madness: true
                },
            },
            {
                text: `<p>Snap out of it and go further into the woods</p>`,
                nextText: 12,
            },
        ]
    },
    // first part of the hidden ending
    {
        id: 14,
        text: `This being, who you could only assume was the king, folds in an instant -- a corpse at first, and then nothing at all.`,
        image: 'placeholder',
        dialogue: `A force compels you to sit on the throne...`,
        options: [{
            text: `<p>Take a seat...</p>`,
            nextText: 21
        }, ]
    },
    // dialogue with the king
    {
        id: 15,
        text: `"In the old days, and I can only assume where you're from, fortune and misfortune could fall at random. A long, long time ago, I separated the two entirely -- luck thrives uninterrupted.`,
        image: 'placeholder',
        dialogue: `You can tell he's telling the truth, it must be why the old man told you to pick up the coin. Still, you can practically feel -- physically -- the misery and regret in his voice.`,
        options: [{
                text: `<p>"If we both disregard our charms, though, won't that bring things back to normal?"</p>`,
                nextText: 22,
            },
            {
                text: `<p>Why did you do it?</p>`,
                nextText: 24,
            },
        ]
    },
    // meeting the chef
    {
        id: 16,
        text: `As you finish snooping around, a man bursts into the kitchen! From his outfit and general look, it's clear he's the chef.`,
        image: 'placeholder',
        dialogue: `"What do you think you're doing here! Get out -- now!`,
        options: [{
                text: `<p>"Wait! I can help you with the food!</p>`,
                nextText: 25,
                setState: {
                    apprenticeChef: true
                },
                requiredState: (currentState) => currentState.recipe
            },
            {
                text: `<p>I'm outta here!</p>`,
                nextText: 7,
            },
        ]
    },
    // meeting the apothecary
    {
        id: 17,
        text: `After what feels like hours of searching, you come across a lone room. Upon opening the door, you find none other than the apothecary! He drops your eye into a concoction as you enter. However, he doesn't seem that malice, just very...dedicated.`,
        image: 'placeholder',
        dialogue: `"A thousand apologies, but being an outlander...well, your eye made for a quite potent reagent. Still, you need to see, and I have this crystal eye that can do the job just as well! It's lucky, too.`,
        options: [{
                text: `<p>"Everything is 'lucky' here. Fine, I'll take it.</p>`,
                nextText: 27,
                setState: {
                    eye: true
                },
            },
            {
                text: `<p>"No way, I'm getting payback!"</p>`,
                nextText: 26,
                setState: {
                    killer: true
                },
                requiredState: (currentState) => currentState.foughtGuard
            },
            {
                text: `<p>Grab the potion! If he made it with your eye, it should be yours.</p>`,
                nextText: 28,
                setState: {
                    potion: true
                },
                requiredState: (currentState) => currentState.state
            },
        ]
    },
    {
        // further dialogue from forest spirit
        id: 18,
        text: `The being seems to look at you, but at the same time, he never seems to look at you -- as if he's looking <i>through</i> you.`,
        image: 'placeholder',
        dialogue: `<p>"This world has been separated, 'ordered', for a long time; here, right here, you stand on the knife's edge of both fortune and misfortune. Nothing is guaranteed, as it is out there, but whatever happens will be an extreme."</p>`,
        options: [{
                text: `<p>Then how do I leave it?</p>`,
                nextText: 23,
            },
            {
                text: `<p>Where are all the other people?</p>`,
                nextText: 29,
            },
            {
                text: `<p>How can I be like you?</p>`,
                nextText: 30,
            }
        ]
    },
    {
        id: 19,
        text: `You can tell the creature was pleased by that question, although you're not sure <i>how</i> you can tell, as the deer skull head stays emotionless.`,
        image: 'placeholder',
        dialogue: `"After a time. There is work for you to do before any of that can happen. This, the heart of the forest, is the last place without the separation; but the larger this circle of untamed chance, or as you would know it, normalcy, grows, the more mundane its effects. This world can be natural again, but the core of its excessive order must be uprooted. <br><br> <h1>By that, I mean the king.</h1>`,
        options: [{
                text: `<p>Killing the king? How will that do anything?</p>`,
                nextText: 31,
            },
            {
                text: `<p>What if I killed you instead?</p>`,
                nextText: 32,
            },
            {
                text: `<p>I don't want to kill anyone!</p>`,
                nextText: 31,
            },
            {
                text: `<p>Say no more, this place is way too weird!</p>`,
                nextText: 33,
            },
        ]
    },
    // madness ending
    {
        id: 20,
        text: `Buzzing. Buzzing. Buzzing. "Chance!", buzzing. "Roll!", buzzing. Buzzing. Constant, monotonous buzzing. Soon, it's as if you have a hive, no, two hives, of bees inside your mind, swarming and stinging your brain.`,
        image: 'placeholder',
        dialogue: `As madness consumes you, so does the forest. In moments, you become another one of its dense foliage, your voice caught on the wind and carried with it, never able to speak again without a gust of air.`,
        options: [{
            text: `<p>"Home..."</p>`,
            nextText: -1,
            setState: {
                died: true,
                becameTree: true
            },
        }, ]
    },
    // secret ending -- the end
    {
        id: 21,
        text: `It feels right. It feels good, powerful. The same force that compelled you to sit demands you put on the old, raggedy crown that...well, whoever the last occupant of this chair wore.`,
        image: ``,
        dialogue: `As the crown touches your head, a full view of the two dimensions -- of fortune and misfortune -- is clear as day to you; all that is, will be, can be, should be, all yours to decide.`,
        options: [{
                text: `<p onclick="addInventory('crown'),showItem('crown')>Full power! This is my world now!</p>`,
                nextText: -2,
                setState: {
                    tyrant: true
                }
            },
            {
                text: `<p onclick="addInventory('crown'),showItem('crown')>I can make things better, something more ideal.</p>`,
                nextText: -2,
                setState: {
                    idealist: true
                }
            },
            {
                text: `<p onclick="addInventory('crown'),showItem('crown')>I can bring the natural world back and end the separation!</p>`,
                nextText: 100,
                setState: {
                    naturalDisorder: true
                },
                requiredState: (currentState) => currentState.potion
            }
        ]
    },
    {
        id: 22,
        text: `"Wait...yes, that might work. Well, nothing to lose by trying it, at least." In an instant, he's lunging at you -- more like a starved animal than a person.`,
        image: 'placeholder',
        dialogue: `"Essence of the old world is a precious resource, moreso than gold," He says, more to justify his actions to himself than anything, "I'd be a fool to pass up the opportunity"`,
        options: [{
                text: `<p>Fight back</p>`,
                nextText: 34,
                setState: {
                    wonFight: true
                },
                requiredState: (currentState) => currentState.potion
            },
            {
                text: `<p>Fight back</p>`,
                nextText: -1,
                setState: {
                    died: true,
                    lostFight: true
                },
            },
            {
                text: `<p>Try to escape</p>`,
                nextText: -1,
                setState: {
                    died: true,
                    fledFight: true
                },
            },
            {
                text: `<p>Try to escape</p>`,
                nextText: 2,
                setState: {
                    fledFight: true
                },
                requiredState: (currentState) => currentState.foot
            },
        ]
    },
    // dead in woods ending
    {
        id: 23,
        text: `"Then you serve no purpose for me," The creature says, matter of factly. Within seconds, the roots surrounding you emerge, consuming you like a leviathan would a ship.`,
        image: 'placeholder',
        dialogue: `As the last light fades, you can feel yourself becoming part of the forests.`,
        options: [{
            text: `<p>You're a tree now.</p>`,
            nextText: -1,
            setState: {
                died: true,
                becameTree: true
            },
        }]
    },
    // more king dialogue
    {
        id: 24,
        text: `The king looks at you as if you just stabbed him in the stomach.`,
        image: 'placeholder',
        dialogue: `"Why? To end the uncertainty of life, to make things...more stable."`,
        options: [{
            text: `<p>Well, if we both take off our charms, maybe that will make things normal again?</p>`,
            nextText: 22,
            setState: {},
            requiredState: (currentState) => currentState.state
        }, ]
    },
    // cooking scene
    {
        id: 25,
        text: `The chef looks at you with a raised eyebrow`,
        image: 'placeholder',
        dialogue: `"You read it? Good, then make yourself useful!"`,
        options: [{
            text: `<p>Get cooking</p>`,
            nextText: 35,
            setState: {
                chefForever: true
            },
        }, ]
    },
    // murder scene for the apothecary
    {
        id: 26,
        text: `You've done it now, you killed the apothecary.`,
        image: 'placeholder',
        dialogue: `Blood is on your hands, why did you do it?`,
        options: [{
            text: `<p>I wanted revenge, now I'm taking this potion and eye!</p>`,
            nextText: 28,
            setState: {
                potion: true,
                eye: true
            },
        }, ]
    },
    // after getting the eye
    {
        id: 27,
        text: `The eye sits in your hands, staring back at you`,
        image: 'placeholder',
        dialogue: `You place it in your pocket, and as you look at the apothecary, he's vanished`,
        options: [{
            text: `<p onclick="addInventory('eye'),showItem('eye')">Turn back towards the castle center</p>`,
            nextText: 7,
        }, ]
    },
    // after drinking potion
    {
        id: 28,
        text: `The potion takes effect instantly, although everything it does is still a mystery to you. Still, there's no blurring anymore, and you can see what seem to be spirits around you`,
        image: 'placeholder',
        dialogue: `As you try to talk to the ghosts around you, they ignore you. Or maybe they simply can't hear you.`,
        options: [{
            text: `<p>Head back to the castle center</p>`,
            nextText: 7,
        }, ]
    },
    // forest spirit dialogue about other people
    {
        id: 29,
        text: `The creature looks at you in a way that says, 'How do you not know this?'`,
        image: 'placeholder',
        dialogue: `"Barring exceptionally powerful beings, anyone whose luck isn't exactly matched are kept from each other, put into their own sort of reality."`,
        options: [{
                text: `<p>So I'm alone here? Let me out!</p>`,
                nextText: 23,
            },
            {
                text: `<p>And you want me to kill the king? Fine</p>`,
                nextText: 33,
            },
        ]
    },
    // power-hungry "how can I be like you" scene
    {
        id: 30,
        text: `The creature seems totally expressionless now, but he does respond`,
        image: 'placeholder',
        dialogue: `"Bloodshed and guilt lead me here. But you will have something similar, if you kill the king.`,
        options: [{
                text: `<p>Fine, I'll do it.</p>`,
                nextText: 33,
            },
            {
                text: `<p>No way!</p>`,
                nextText: 23,
            },
        ]
    },
    // getting convinced to go w the plot scene
    {
        id: 31,
        text: `"It isn't about revenge," He says, tilting his head, "It's about mercy. He's pretended to be a god for millennia, and now it weighs on him as heavily as the rest of us."`,
        image: 'placeholder',
        dialogue: `"Striking him down is the only way to restore the natural order."`,
        options: [{
                text: `<p>No, that's wrong!</p>`,
                nextText: 23,
            },
            {
                text: `<p>Fine, I'll do it.</p>`,
                nextText: 33,
            },
        ]
    },
    // serial killer playthrough, forest spirit 
    {
        id: 32,
        text: `You're not match for the creature, and he kills you instantly.`,
        image: 'placeholder',
        dialogue: `It's over in a second -- a straight cut to black.`,
        options: [{
            text: `<p>You died</p>`,
            nextText: -1,
            setState: {
                died: true
            },
        }, ]
    },
    // plan acceptance
    {
        id: 33,
        text: `Good, take this charm and be on your way.`,
        image: 'placeholder',
        dialogue: `The creature gives you a rabbit's foot, how...cliche`,
        options: [{
            text: `<p onclick="addInventory('foot'),showItem('foot')">You head towards the castle</p>`,
            nextText: 4,
            setState: {
                foot: true
            },
        }, ]
    },
    // successful king fight next scene, end scene
    {
        id: 34,
        text: `Your strike lands true, and the man, however strong he might have used to be, is weakened by his unnaturally long life. He crumples to the floor, and in an instant his body vanishes, leaving only his crown.`,
        image: 'placeholder',
        dialogue: `Your hands move to the crown without thinking, and in an instant you have total control...and in another instant, you lose it. All you can do now is return things to normal.`,
        options: [{
            text: `<p onclick="addInventory('crown'),showItem('crown')>Then let's return the world to nature.</p>`,
            nextText: 100,
            setState: {
                crown: true,
                naturalDisorder: true
            },
        }, ]
    },
    {
        id: 35,
        text: `Your cooking skills are impressive. In fact, they're too impressive.`,
        image: 'placeholder',
        dialogue: `The chef, as your back is turned, puts his hat on you -- locking you into his role for eternity.`,
        options: [{
            text: `<p>You live the rest of your existence as a spirit trapped in a husk</p>`,
            nextText: -1,
        }, ]
    },
    // return to nature ending
    {
        id: 100,
        text: `The world returns to nature, and suddenly you're back...home. Everything is back where it should be.`,
        image: 'placeholder',
        dialogue: ``,
        options: [{
            text: `<p>The end! Go to the summary</a>`,
            nextText: -1,
        }, ]
    },
    // death scene
    {
        id: -1,
        text: `In this world of chance, the lucky thrive and the unlucky...well, you just found out. But you can always take another...</p>`,
        image: 'placeholder',
        dialogue: ``,
        options: [{
            text: `<a href="index.html">Summary</a>`,

        }, ]
    },
    // becoming the king endings
    {
        id: -2,
        text: `<p>Perhaps you rule benevolently, or perhaps you take out all your anger on your people. Regardless, unless someone ends your rule, you will be king for eternity.</p>`,
        image: 'placeholder',
        dialogue: `It's good to be in charge.`,
        options: [{
            text: `<a href="index.html">Replay?</a>`,
        }, ]
    },
];
// end everything with this square bracket, don't let it move
startGame();