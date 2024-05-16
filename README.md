# ***ROCHAMBEAU!***

## ***Introduction***
"A small adventure" is a choose-your-own adventure game based in a world where, instead of things being left to chance, fortune and misfortune are hard-divided. In its current iteration, the main goal of the story is to return this world to its natural state. There is also a secret ending where the player can instead rule the world as it is.

![generated mock up of A Small Adventure!](doc/readme-images/mockup.png)

[Click here to view the deployed Page](https://tommyspecs.github.io/rock-paper-scissors-lizard-spock/)

---

## ***Contents***

  - [***A Small Adventure!***](#a-small-adventure)
  - [***Introduction***](#introduction)
  - [***Contents***](#contents)
  - [***User Experience*** (UX)](#user-experience-ux)
    - [*Site Goals*](#site-goals)
    - [*Planned Features*](#planned-features)
    - [*Planned Implementation*](#planned-implementation)
  - [***User Experience Design (UXD)***](#user-experience-design-uxd)
      - [*Instructions on How to Play*](#guide)
      - [*Buttons Show only on Certain Prior Choices*](#choices-matter)
      - [*Inventory System*](#inventory)
      - [*Winner Screen*](#hard-game)
      - [*Death Screen*](#game-over-modal)
    - [*Colour Scheme*](#colour-scheme)
    - [*Design*](#design)
    - [*Image Sourcing*](#image-sourcing)
  - [***Features***](#features)
    - [*General Features*](#general-features)
    - [*Future Enhancements*](#future-enhancements)
  - [***Technologies Used***](#technologies-used)
    - [*Languages Used*](#languages-used)
    - [*Frameworks, Libraries \& Programs Used*](#frameworks-libraries--programs-used)
  - [***Testing***](#testing)
  - [***Deployment***](#deployment)
  - [***Credits***](#credits)
    - [*Content*](#content)
    - [*Media*](#media)

---

## ***User Experience*** (UX)

### *Site Goals*
- To be a replayable Choose Your Own Adventure Game for ages, roughly, 13+
- To be entertaining and puzzling
- To maintain a pattern of interaction as to not cause unpleasant user experiences
- To keep players in an exploration mindset
- To allow users to be the good guy or bad guy in the story
- To ensure the game is fully accessible on desktop and devices that are touch enabled
- To ensure the game is fully compliant with screen readers

### *Planned Features*
- Responsive Design - The site should function correctly not matter which device a user could potentially use, such as Desktop, Laptop, Tablet and Mobile.
- All navigation elements should be obvious on the site. 
- Two difficulty levels should be available
- The user should be able to select the number of rounds to play
- The site should be fully accessible for screen reader users

### *Planned Implementation*

#### User Story: 
  - As a user I want a fun and simple game to play
#### Acceptance Criteria
  - The site should show clearly that it is a game.
  - Clearly show how it the game is played.
#### Planned Implementation
  - Incorporate game elements such as interactive buttons that provide changes to a score, choices of difficulty, round options and a game over screen.
  - Incorporate a clearly marked rules button that will take the user to a clearly written rules screen.

#### User Story:
  -  As a user I want to find my way around the site with ease
#### Acceptance Criteria
  - Areas of the site need to be clearly labeled.
  - Have the ability to return to a "home" point.  
#### Planned Implementation
  - Incorporate large bold titles that can be cleaarly seen.
  - Incorpoerate eye catching, well labelled buttons that lead the user to their desired location.

#### User Story:
  - As a user I want to be able to control the time it takes to play the game
#### Acceptance Criteria
  - Provide an ability to control the length of time a game takes.
#### Planned Implementation
  - Incorporate an ability for the user to choose how many rounds a game should take.

#### User Story: 
  - As a user I want to be able to play a more challenging version of the game
#### Acceptance Criteria
  - Provide the user a choice of difficulties 
#### Planned Implementation
  - Incorporate at least two modes of the game one slightly more challenging than the other.  

#### User Story:
- As a user I want to be able to use a screen reader to help me play the game
#### Acceptance Criteria
  - Ensure that the site has a high accesibilty level.
#### Planned Implementation
  - Ensure any images have alt elements.
  - Implement a colour scheme that contrasts well with the background
  - Ensure the foreground is not distracted by the backgroud.
---

## ***User Experience Design (UXD)***

### *Wire Frame*
Balsamiq was utilised to produce wireframes of how the game would appear across different devices. 
Although the game is intended to be contained within one page, I produced wireframes for the different content that would appear on the page. 
Using Balsamiq helped me to consider many different layouts for the game elements before choosing the final design.

#### *Main Menu*
![Wire frame Mock-up of the Menu Modal (Desktop)](doc/readme-images/wireframe-menu-Desktop.png)
![Wire frame Mock-up of the Menu Modal (Mobile and Tablet)](doc/readme-images/wireframe-menu-tablet-mobile.png)

#### *Rules Modal*
![Wire frame Mock-up of the Rules Modal (Desktop)](doc/readme-images/wireframe-rules-desktop.png)
![Wire frame Mock-up of the Rules Modal (Mobile and Tablet)](doc/readme-images/wireframe-rules-tablet-mobile.png)

#### *Lives Modal*
![Wire frame Mock-up of the Lives Modal (Desktop)](doc/readme-images/wireframe-lives-desktop.png)
![ire frame Mock-up of the Lives Modal (Mobile and Tablet)](doc/readme-images/wireframe-lives-tablet-mobile.png)

#### *Easy Game*
![Wire frame Mock-up of the Easy Game Screen (Desktop)](doc/readme-images/wireframe-game-screen-easy-desktop.png)
![ire frame Mock-up of the Easy Game Screen (Mobile and Tablet)](doc/readme-images/wireframe-game-screen-easy-tablet-mobile.png)

#### *Hard Game*
![Wire frame Mock-up of the Hard Game Screen (Desktop)](doc/readme-images/wireframe-game-screen-hard-desktop.png)
![ire frame Mock-up of the Hard Game Screen (Mobile and Tablet)](doc/readme-images/wireframe-game-screen-hard-tablet-mobile.png)

#### *Game Over Modal*
![Wire frame Mock-up of the Game Over Modal (Desktop)](doc/readme-images/wireframe-gameover-desktop.png)
![ire frame Mock-up of the Game Over (Mobile and Tablet)](doc/readme-images/wireframe-gameover-tablet-mobile.png)


### *Colour Scheme*
This colour scheme was chosen as it is bright and joyful. It is inviting for children and contrasts well against plain background colours ensuring those with assecibilty concerns can stil use the site.
![Colour Palette part one](doc/readme-images/colorPalette1.png)
![Colour Palette part two](doc/readme-images/colorPalette2.png)

### *Design*
Once happy with the overall structure for the site, and the colour scheme chosen the planne implementations were followed to produce a site which stuck to the acceptance criteria laid out.
The buttons were designed to be large and colourful and also interactive to keep interest and to invite the user to press it.
The game icons where in corporated into the rules so that it was clear and easy to understand how the game is played.
Text was kept to one colour so that the user can notice the text easily aginst the colours of the site.

### *Typography*
Google fonts were used to find a combination of fonts that would be clear for the user, but still conveying an element of fun. The fonts "Bebas Neue" and "josefin-sans" were eventually chosen.

### *Image Sourcing*
The icons used for the game were gathered from the fomtAwesome site and the image used in the rules was found from a google image search.

---

## ***Features***
Website features are the many individual components that make up the site, making it easy to navigate, functional and valuable to visitors. 
### *General Features*
Favicon
The favicon is a small image that can be seen on the top left of the visitors tab when they have the site open. It is used to mark the site if the visitor has multiple tabs open in their browser, allowing them to find LychParlour photography easily. 


Mention what a modal is?
---A modal (also called a modal window or lightbox) is a web page element that displays in front of and deactivates all other page content. To return to the main content, the user must engage with the modal by completing an action or by closing it. Modals are often used to direct users’ attention to an important action or piece of information on a website or application.

The purpose of modals can be summed up in one word: focus. If you need visitors to focus on something simple, a modal window is one of the most effective means to do so. Users must either close the modal, or complete a specific action within it (e.g., reading a message and clicking “OK”, filling out a form, etc.).

Modals are polarizing among designers and users alike. Many find value in their ability to quickly bring attention to something essential, while others regard them as an unwelcome interruption to the user experience.

In practice, it all depends on whether the modal is well-designed and purposeful. When done right, they can be a helpful technique for both your users and for your numbers: According to a recent study of nearly 2 billion modal popups, the top 10% best-performers converted at a remarkable rate of 9.28%.

Benefits of Modals
Aside from channeling focus, modals present additional benefits over other display elements.

Simplicity
Modals keep things simple. Everything stays within one tab, helping visitors stay connected with what they were doing before the modal appeared.

Visibility
Since modals appear within the user’s active tab, you can be sure it will be seen. If instead the prompt were to appear in a new window, the user could miss it or instinctively close the new window after being conditioned by annoying ad popups.

Flexibility
Modals also help preserve page space by displaying featured media, like images or videos, in a lightbox.---


main menu
- title
- subtitle
- easy button
- hard button
- rules button
- lives button

rules modal
- title
- rules
- image
- cross

lives modal
 - title
 - slider
 - life counter
 - easy buttom
  - hard button
  - menu button 

main game
- title
- player instruction
- player choice button
  - vary on difficulty
- results section
  - life number
  - result
  
game over Modal
- title
- gamover result
- game over message
- meu button

### *Future Enhancements*
This to add to Rochambeu in the future may include, swapping the number of lives out for heart icons that reduce in number when lives are lost
potentiall a story to make the game more enticing
animation to increase the level of interactivity the user gets when usoing the site

---

### *Acessibility*
I have been mindful during coding to ensure that the website is as accessible and friendly as possible. I have achieved this by:

Using semantic HTML, CSS and JavaScript
Using descriptive alt attributes on images on the site.
Ensuring that there is a sufficient colour contrast throughout the site.
Ensuring menus are accessible by marking the current page as current for screen readers.

---

## ***Technologies Used***

### *Languages Used*

HTML, CSS and Javascript were used to create this website.

### *Frameworks, Libraries & Programs Used*
- Github - To save and store the files for the site.
- Google Fonts - To import the fonts used on the site.
- Font Awesome - For the iconography on the site.
- Google Dev Tools - To troubleshoot and test features, solve issues with responsiveness and styling.
- favicon.io - To create the favicon for the site
- Balsamiq - Used to create wire framed designs for the site
- techsini.com - Used to create the mock up on multiple devices
- coolors.co - used to generate the colour pallete for the site

---

## ***Testing***
Please [click](https://github.com/TommySpecs/rock-paper-scissors-lizard-spock/blob/main/testing.md) to visit the testing page.

---

## ***Deployment***
Github Pages were used to deploy the live website. The instructions to achieve this are:

- Log in (or sign up) to Github.
- Find the repository for this project.
- Click on the Settings link.
- Click on the Pages link in the navigation bar on the left.
- In the Source section, choose main from the drop down select branch menu.
- Select Root from the drop down select folder menu.
- Click Save.
- Your live Github Pages site is now deployed at the URL shown.
- With each new commit and git push the deployed site will update.

The live link can be found [here](https://tommyspecs.github.io/rock-paper-scissors-lizard-spock/)

---

## ***Credits***

### *Content*
- https://www.color-hex.com/color-palette/15897 - colour scheme
- https://www.youtube.com/watch?v=3uKdQx-SZ5A  - Rock, Paper, Scissors (1) -didn’t work for me
- https://www.youtube.com/watch?v=lV2BMXdsDmc
- https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
- https://www.w3schools.com/howto/howto_css_modals.asp
- https://www.w3schools.com/js/js_if_else.asp
- https://developer.mozilla. /en-US/docs/Web/HTML/Element/input/range
- https://www.w3schools.com/js/js_htmldom_eventlistener.asp
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Less_than
- https://www.w3schools.com/css/css3_borders.asp
- https://www.pgpedia.com/r/rock-paper-scissors#:~:text=The%20rock%20is%20a%20closed,and%20scissors%20wins%20against%20paper.
- https://blog.hubspot.com/website/modal-web-design
- https://jshint.com/docs/


### *Media*
https://bigbangtheory.fandom.com/wiki/Rock,_Paper,_Scissors,_Lizard,_Spock - rock paper scissors lizard spock image