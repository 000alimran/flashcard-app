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
    <div class="card-buttons">
      <button class="edit-button">Edit</button>
      <button class="delete-button">Delete</button>
    </div>
  `;

  // Add Flip Functionality
  const flashcardInner = flashcard.querySelector('.flashcard-inner');
  flashcardInner.addEventListener('click', () => {
    flashcard.classList.toggle('flipped');
  });

  // Add Edit Functionality
  const editButton = flashcard.querySelector('.edit-button');
  editButton.addEventListener('click', () => {
    const newFront = prompt('Edit the front text:', front);
    const newBack = prompt('Edit the back text:', back);

    if (newFront !== null && newBack !== null && newFront.trim() !== '' && newBack.trim() !== '') {
      // Update DOM
      flashcard.querySelector('.flashcard-front').textContent = newFront;
      flashcard.querySelector('.flashcard-back').textContent = newBack;

      // Update Local Storage
      updateLocalStorage(front, back, newFront, newBack);
    } else {
      alert("Both fields are required for editing!");
    }
  });

  // Add Delete Functionality
  const deleteButton = flashcard.querySelector('.delete-button');
  deleteButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete this card?')) {
      // Remove from DOM
      flashcard.remove();

      // Remove from Local Storage
      removeFromLocalStorage(front, back);
    }
  });

  flashcardContainer.appendChild(flashcard);
}

// Update Local Storage after Edit
function updateLocalStorage(oldFront, oldBack, newFront, newBack) {
  const storedCards = JSON.parse(localStorage.getItem('flashcards')) || [];
  const updatedCards = storedCards.map(card => {
    if (card.front === oldFront && card.back === oldBack) {
      return { front: newFront, back: newBack };
    }
    return card;
  });
  localStorage.setItem('flashcards', JSON.stringify(updatedCards));
}

// Remove from Local Storage after Delete
function removeFromLocalStorage(front, back) {
  const storedCards = JSON.parse(localStorage.getItem('flashcards')) || [];
  const filteredCards = storedCards.filter(card => card.front !== front || card.back !== back);
  localStorage.setItem('flashcards', JSON.stringify(filteredCards));
}
