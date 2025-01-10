// Elements
const frontInput = document.getElementById('front-input');
const backInput = document.getElementById('back-input');
const addCardButton = document.getElementById('add-card');
const flashcardContainer = document.getElementById('flashcard-container');

// Load Flashcards from Local Storage
document.addEventListener('DOMContentLoaded', () => {
  const storedCards = JSON.parse(localStorage.getItem('flashcards')) || [];
  storedCards.forEach(card => addFlashcardToDOM(card.front, card.back));
});

// Add Card to Local Storage and DOM
addCardButton.addEventListener('click', () => {
  const front = frontInput.value.trim();
  const back = backInput.value.trim();

  if (front === '' || back === '') {
    alert('Both fields are required!');
    return;
  }

  // Save to Local Storage
  const storedCards = JSON.parse(localStorage.getItem('flashcards')) || [];
  storedCards.push({ front, back });
  localStorage.setItem('flashcards', JSON.stringify(storedCards));

  // Add to DOM
  addFlashcardToDOM(front, back);

  // Clear inputs
  frontInput.value = '';
  backInput.value = '';
});

// Add Flashcard to DOM
function addFlashcardToDOM(front, back) {
  const flashcard = document.createElement('div');
  flashcard.classList.add('flashcard');

  flashcard.innerHTML = `
    <div class="flashcard-inner">
      <div class="flashcard-front">${front}</div>
      <div class="flashcard-back">${back}</div>
    </div>
  `;

  // Flip card on click
  flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('flipped');
  });

  flashcardContainer.appendChild(flashcard);
}
