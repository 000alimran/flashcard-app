let flashcards = [];
let learnedCount = 0;

// Categories
const categories = ['Math', 'Science', 'History'];
const categorySelect = document.getElementById('category-select');
categories.forEach(category => {
  const option = document.createElement('option');
  option.value = category;
  option.textContent = category;
  categorySelect.appendChild(option);
});

// Add Event Listeners
document.getElementById('add-card').addEventListener('click', addFlashcard);
document.getElementById('random-card').addEventListener('click', showRandomCard);

// Function to Add Flashcard
function addFlashcard() {
  const frontText = prompt('Enter text for the front side of the card:');
  const backText = prompt('Enter text for the back side of the card:');
  const category = prompt('Enter category for the card (Math, Science, History):');

  if (frontText && backText && categories.includes(category)) {
    const newCard = { front: frontText, back: backText, learned: false, category: category };
    flashcards.push(newCard);
    renderFlashcards();
  } else {
    alert('All fields are required and category must be valid!');
  }
}

// Render Flashcards
function renderFlashcards() {
  const container = document.getElementById('flashcard-container');
  container.innerHTML = '';

  const selectedCategory = categorySelect.value;

  flashcards.forEach((card, index) => {
    if (selectedCategory !== 'all' && card.category !== selectedCategory) return;

    const flashcardDiv = document.createElement('div');
    flashcardDiv.className = 'flashcard';

    // Create front and back divs
    const frontDiv = document.createElement('div');
    frontDiv.className = 'flashcard-front';
    frontDiv.textContent = card.front;

    const backDiv = document.createElement('div');
    backDiv.className = 'flashcard-back';
    backDiv.textContent = card.back;

    // Append front and back divs
    flashcardDiv.appendChild(frontDiv);
    flashcardDiv.appendChild(backDiv);

    // Add click event to flip the card
    flashcardDiv.addEventListener('click', () => flipFlashcard(index));

    container.appendChild(flashcardDiv);
  });

  updateProgress();
}

// Flip Flashcard and Mark as Learned
function flipFlashcard(index) {
  const card = document.querySelectorAll('.flashcard')[index];
  card.classList.toggle('flipped');

  if (!flashcards[index].learned) {
    flashcards[index].learned = true;
    learnedCount++;
    updateProgress();
  }
}

// Update Progress Bar
function updateProgress() {
  const progressBar = document.getElementById('progress-bar');
  const progress = (learnedCount / flashcards.length) * 100 || 0;
  progressBar.style.width = `${progress}%`;
  progressBar.setAttribute('aria-valuenow', progress.toFixed(0));
  progressBar.textContent = `${progress.toFixed(0)}%`;
}

// Show Random Flashcard
function showRandomCard() {
  const cards = document.querySelectorAll('.flashcard');
  if (cards.length === 0) return;

  const randomIndex = Math.floor(Math.random() * cards.length);
  cards[randomIndex].scrollIntoView({ behavior: 'smooth' });
}
