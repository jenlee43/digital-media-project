document.addEventListener('DOMContentLoaded', function() {
  // Quiz questions
  const questions = [
    {
      question: "What is the highest mountain in Mindanao?",
      options: ["Mt. Kitanglad", "Mt. Apo", "Mt. Dulang-dulang", "Mt. Matutum"],
      answer: 1,
      fact: "Mt. Apo stands at 2,954 meters (9,692 ft) above sea level and is the highest mountain in the Philippines."
    },
    {
      question: "It is known as the Surfing Capital of the Philippines.",
      options: ["Davao", "Siargao", "Bukidnon", "Samal"],
      answer: 1,
      fact: "The Bajau people have lived as nomadic seafarers for centuries, with exceptional free-diving abilities."
    },
    {
      question: "What fruit is Mindanao famous for producing?",
      options: ["Mangoes", "Durian", "Pineapple", "All of the above"],
      answer: 3,
      fact: "Mindanao produces 90% of the Philippines' durian and is a major exporter of pineapples and mangoes."
    },
    // Add more questions...
  ];

  // Quiz variables
  let currentQuestion = 0;
  let score = 0;
  const totalQuestions = questions.length;
  
  // DOM elements
  const questionText = document.querySelector('.question-text');
  const optionsContainer = document.querySelector('.options-container');
  const scoreValue = document.querySelector('.score-value');
  const scoreTotal = document.querySelector('.score-total');
  const progressBar = document.querySelector('.progress-bar');
  const resultContainer = document.querySelector('.result-container');
  const resultTitle = document.querySelector('.result-title');
  const resultText = document.querySelector('.result-text');
  const resultIcon = document.querySelector('.result-icon');
  const quizComplete = document.querySelector('.quiz-complete');
  const finalScoreTitle = document.querySelector('.final-score-title');
  const finalScoreDisplay = document.querySelector('.final-score-display');
  const finalMessage = document.querySelector('.final-message');

  // Initialize quiz
  function initQuiz() {
    scoreTotal.textContent = totalQuestions;
    loadQuestion();
  }

  // Load question
  function loadQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = question.question;
    
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.classList.add('option-btn');
      button.textContent = option;
      button.addEventListener('click', () => selectOption(index));
      optionsContainer.appendChild(button);
    });
    
    // Update progress
    progressBar.style.width = `${(currentQuestion / totalQuestions) * 100}%`;
  }

  // Handle option selection
  function selectOption(selectedIndex) {
    const question = questions[currentQuestion];
    const options = document.querySelectorAll('.option-btn');
    
    // Disable all options
    options.forEach(option => {
      option.style.pointerEvents = 'none';
    });
    
    // Mark correct/incorrect
    if (selectedIndex === question.answer) {
      options[selectedIndex].classList.add('correct');
      score++;
      scoreValue.textContent = score;
      showResult(true, question.fact);
    } else {
      options[selectedIndex].classList.add('incorrect');
      options[question.answer].classList.add('correct');
      showResult(false, question.fact);
    }
  }

  // Show result
  function showResult(isCorrect, fact) {
    if (isCorrect) {
      resultTitle.textContent = "Correct!";
      resultTitle.style.color = "#3a5a40";
      resultIcon.textContent = ["🌟", "🍍", "🏔️", "🎉"][Math.floor(Math.random() * 4)];
    } else {
      resultTitle.textContent = "Incorrect";
      resultTitle.style.color = "#e63946";
      resultIcon.textContent = ["💡", "📚", "🌋", "🔍"][Math.floor(Math.random() * 4)];
    }
    
    resultText.textContent = fact;
    document.querySelector('.question-container').classList.add('d-none');
    resultContainer.classList.remove('d-none');
  }

  // Next question
  document.querySelector('.next-question').addEventListener('click', function() {
    currentQuestion++;
    
    if (currentQuestion < totalQuestions) {
      document.querySelector('.question-container').classList.remove('d-none');
      resultContainer.classList.add('d-none');
      loadQuestion();
    } else {
      showFinalResults();
    }
  });

  // Show final results
function showFinalResults() {
    quizComplete.classList.remove('d-none');
    document.querySelector('.quiz-body').classList.add('d-none');
   
	
    finalScoreTitle.textContent = "Quiz Complete!";
    finalScoreDisplay.textContent = `${score}/${totalQuestions}`;
    
    if (score === totalQuestions) {
        finalMessage.textContent = "Perfect! You're a Mindanao expert!";
        finalScoreDisplay.textContent += " 🎯";
        triggerConfetti(); // Add this line
    } else if (score >= totalQuestions * 0.7) {
        finalMessage.textContent = "Great job! You know Mindanao well!";
        finalScoreDisplay.textContent += " 👍";
    } else {
        finalMessage.textContent = "Nice try! Learn more about Mindanao's wonders!";
        finalScoreDisplay.textContent += " 🌴";
    }
}

  // Restart quiz
  document.querySelector('.restart-quiz').addEventListener('click', function() {
    currentQuestion = 0;
    score = 0;
    scoreValue.textContent = score;
    
    quizComplete.classList.add('d-none');
    document.querySelector('.quiz-body').classList.remove('d-none');
    document.querySelector('.question-container').classList.remove('d-none');
    resultContainer.classList.add('d-none');
    
    loadQuestion();
  });

  // Start the quiz
  initQuiz();
});




function showFinalResults() {
    quizComplete.classList.remove('d-none');
    document.querySelector('.quiz-body').classList.add('d-none');
    
    finalScoreTitle.textContent = "Quiz Complete!";
    finalScoreDisplay.textContent = `${score}/${totalQuestions}`;
    alert('here');
    if (score === totalQuestions) {
    finalMessage.textContent = "Perfect! You're a Mindanao expert!";
    finalScoreDisplay.textContent += " 🎯";
    quizComplete.classList.add('perfect-score');
    triggerConfetti();
} else if (score >= totalQuestions * 0.7) {
        finalMessage.textContent = "Great job! You know Mindanao well!";
        finalScoreDisplay.textContent += " 👍";
    } else {
        finalMessage.textContent = "Nice try! Learn more about Mindanao's wonders!";
        finalScoreDisplay.textContent += " 🌴";
    }
}

// Add this new function
function triggerConfetti() {
    // Create a custom colorful confetti mix
    const colors = ['#e67e22', '#d35400', '#5e3023', '#3a5a40', '#344e41', '#f1c40f'];
    
    // First burst
    confetti({
        particleCount: 150,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
    });
    
    // Second burst from right side
    confetti({
        particleCount: 150,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
    });
    
    // Center burst after delay
    setTimeout(() => {
        confetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 },
            colors: colors
        });
    }, 300);
    
    // Continue smaller bursts for celebration
    const duration = 3000;
    const end = Date.now() + duration;
    
    (function frame() {
        confetti({
            particleCount: 10,
            angle: 60,
            spread: 55,
            origin: { x: Math.random() },
            colors: colors
        });
        
        confetti({
            particleCount: 10,
            angle: 120,
            spread: 55,
            origin: { x: Math.random() },
            colors: colors
        });
        
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}


