const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const btn_reset = document.getElementsByClassName('btn__reset')[0];

let missed = 0;

const overlay = document.getElementById('overlay');
btn_reset.addEventListener('click', (e) => {
    missed = 0;
    let imgReplace = document.querySelectorAll('.tries img');
    imgReplace.forEach(imgReplace => {
        imgReplace.src = 'images/liveHeart.png';
    });
        const ul = document.querySelector('ul');
        ul.innerHTML = '';
        const qwertyButtons = qwerty.querySelectorAll('button');
        qwertyButtons.forEach(button => {
            button.removeAttribute('disabled');
            button.classList.remove('chosen');
            button.disabled = false;
        });
        const phraseArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseArray);
        
    overlay.style.display = 'none';
});

const phrases = [
  'learn how to make trinkets',
  'the strongest dog around',
  'you can see paris from here',
  'well that did not go accordingly',
  'use the other pen for that',
];

function getRandomPhraseAsArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)].split('');
}
getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arr) {
    const ul = document.querySelector('#phrase ul');
   for (let i = 0; i < arr.length; i += 1) {
       let li = document.createElement('li');
       ul.appendChild(li);
       li.textContent = arr[i];
        if (arr[i] === ' ') {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
    }
}

function checkLetter(qwertyButton) {
    let li = document.getElementsByClassName('letter');
    let match = null;

    for (let i = 0; i < li.length; i += 1) {
        if (li[i].textContent === qwertyButton.textContent) {
            li[i].classList.add('show');
            match = li[i].textContent;
        } else {
            li[i].classList.add('null');
        }
       
    }
    return match;
}

qwerty.addEventListener('click', (e) => { 
    const button = e.target;
    const letterFound = checkLetter(button);
    if (button.tagName === "BUTTON") {
    button.classList.add('chosen');
    button.disabled = true;
    if (letterFound === null) {
    const imgReplace = document.getElementsByTagName('img');
    imgReplace[missed].src = 'images/lostHeart.png';
    missed += 1;
    } 
}
    checkWin();

});

function checkWin() {
    const letter = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');
    const title = document.querySelector('.title');
    if (show.length === letter.length) {
        title.innerHTML = 'Good Golly, Miss Molly!';
        overlay.className = 'win';
        overlay.style.display = "flex";
        btn_reset.textContent = "Play again?"
    } else if (missed == 5) {
        title.innerHTML = 'Yikes! Better luck next time!';
        overlay.className = 'lose';
        overlay.style.display = "flex";
        btn_reset.textContent = "Try again?"
    }

}