const card = document.querySelector('.card');

card.addEventListener('click', () => {
    card.classList.toggle('flipped');
});
const addCardButton = document.getElementById('add-card');
const saveCardsButton = document.getElementById('save-cards');
let cards = JSON.parse(localStorage.getItem('cards')) || [];

addCardButton.addEventListener('click', () => {
    const question = prompt('Enter the question:');
    const answer = prompt('Enter the answer:');
    if (question && answer) {
        cards.push({ question, answer });
        renderCards();
    }
});

saveCardsButton.addEventListener('click', () => {
    localStorage.setItem('cards', JSON.stringify(cards));
    alert('Cards saved!');
});

function renderCards() {
    const container = document.querySelector('.container');
    container.innerHTML = '';
    cards.forEach((cardData, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <div class="front">${cardData.question}</div>
            <div class="back">${cardData.answer}</div>
        `;
        cardElement.addEventListener('click', () => {
            cardElement.classList.toggle('flipped');
        });
        container.appendChild(cardElement);
    });
}

renderCards();
