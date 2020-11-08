const cards = [
    {
        id: 1,
        img: 'images/1.jfif'
    },
    {
        id: 2,
        img: 'images/2.jfif'
    },
    {
        id: 3,
        img: 'images/3.jfif'
    },
    {
        id: 4,
        img: 'images/4.jfif'
    },
    {
        id: 5,
        img: 'images/5.jfif'
    },
    {
        id: 6,
        img: 'images/6.jfif'
    },
    {
        id: 7,
        img: 'images/7.jfif'
    },
    {
        id: 8,
        img: 'images/8.jfif'
    }
];

const cards_container = document.querySelector('.js-cards_container');
let hasFlipped = false;
let playing = false;
let firstCard, secondCard;

const createItem = (card) => {
    const block = document.createElement('div');
    block.classList.add('flip-container');
    block.innerHTML = `
            <div class="flipper card" data-id="${card.id}">
                <div class="front">
                    <img src="images/card-front.jfif" alt="card-front">
                </div>
                <div class="back">
                    <img src="${card.img}" alt="${card.img}">
                </div>
            </div>
        `;
    return block;
}

const renderItems = (cards) => {
    let fragment = document.createDocumentFragment();
    cards.forEach((card) => {
        let block = createItem(card);
        fragment.appendChild(block);
    })
    cards_container.appendChild(fragment);
}

const flipCard = (target) => {
    if (target.classList.value === 'flipper card') {
        target.classList.add('flipped');
        if (!hasFlipped) {
            hasFlipped = true;
            firstCard = target;
        } else {
            hasFlipped = false;
            secondCard = target;
            if (firstCard.dataset.id === secondCard.dataset.id) {
                wrongCards();
            } else {
                rightCards();
            }
        }
    }
}

const wrongCards = () => {
    firstCard.classList.remove('card');
    secondCard.classList.remove('card');
}

const rightCards = () => {
    playing = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        playing = false;
    }, 500);
}

cards_container.addEventListener('click', (event) => {
    const target = event.target;
    if (playing) return;
    flipCard(target);
})

const newArray = [...cards, ...cards].sort(() => 0.2 - Math.random());

renderItems(newArray);