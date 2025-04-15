document.addEventListener('DOMContentLoaded', function() {
    const flashcard = document.getElementById('flashcard');
    const cardFront = document.getElementById('card-front');
    const cardBack = document.getElementById('card-back');
    const newCardBtn = document.getElementById('new-card-btn');
    const flipCardBtn = document.getElementById('flip-card-btn');
    const cardCount = document.getElementById('card-count');
    
    let cards = [];
    let currentCardIndex = -1;
    
    // Carrega os cards do arquivo JSON
    fetch('cards.json')
        .then(response => response.json())
        .then(data => {
            cards = data;
            showRandomCard();
        })
        .catch(error => {
            console.error('Erro ao carregar os cards:', error);
            cardFront.querySelector('.card-content').innerHTML = '<p>Erro ao carregar os cards. Verifique o console.</p>';
        });
    
   // Mostra um card aleatório
function showRandomCard() {
    if (cards.length === 0) return;
    
    // Garante que o card volte para o lado frontal
    flashcard.classList.remove('flipped');
    flashcard.style.transform = 'rotateY(0deg)';
    
    currentCardIndex = Math.floor(Math.random() * cards.length);
    const card = cards[currentCardIndex];
    
    cardFront.querySelector('.card-content').innerHTML = `
        <h2>${card.pergunta}</h2>
        <p>Dica: Clique no card ou no botão para ver a resposta</p>
    `;
    
    cardBack.querySelector('.card-content').innerHTML = `
        <h2>Resposta</h2>
        <p>${card.resposta}</p>
    `;
    
    // Animação de entrada do novo card
    flashcard.style.animation = 'none';
    void flashcard.offsetWidth; // Trigger reflow
    flashcard.style.animation = 'cardAppear 0.5s ease-out';
    

}
    
  
    
    // Event listeners
    newCardBtn.addEventListener('click', showRandomCard);
    
    flipCardBtn.addEventListener('click', flipCard);
    
    flashcard.addEventListener('click', flipCard);
    
    // Função para virar o card
    function flipCard() {
        if (cards.length > 0) {
            flashcard.classList.toggle('flipped');
            
            // Pequena animação ao virar
            if (flashcard.classList.contains('flipped')) {
                flashcard.style.transform = 'rotateY(180deg)';
            } else {
                flashcard.style.transform = 'rotateY(0deg)';
            }
        }
    }
    
    // Adiciona animação CSS dinamicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cardAppear {
            0% { transform: scale(0.95); opacity: 0.8; }
            50% { transform: scale(1.03); opacity: 1; }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});