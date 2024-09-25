// Array of quiz questions, options, and the corresponding correct answers
const quizData = [
    {
        question: "What brings you to our nonprofit?",
        options: [
            "I need help with a specific project.",
            "I am interested in one of your programs.",
            "Both—I'm interested in help and programs."
        ],
        answer: null // No right or wrong answers, but we track the user's input
    },
    {
        question: "What kind of support are you seeking?",
        options: [
            "I need mentorship or guidance.",
            "I need resources or materials.",
            "I want to be part of a development program."
        ],
        answer: null
    },
    {
        question: "How soon do you need support?",
        options: [
            "Immediately, within the next few weeks.",
            "In the next few months.",
            "No rush—I'm exploring my options."
        ],
        answer: null
    }
];

// Get references to the DOM elements for the quiz, submit button, and result display
const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultContainer = document.getElementById('result');

// Function to load the quiz questions into the page
function loadQuiz() {
    quizContainer.innerHTML = ''; // Clear existing content
    quizData.forEach((q, index) => {
        const quizBlock = document.createElement('div');
        quizBlock.classList.add('quiz-block');
        
        // Add the question
        quizBlock.innerHTML = `<h3>${q.question}</h3>`;
        
        // Add the options as radio buttons
        q.options.forEach(option => {
            const label = document.createElement('label');
            label.innerHTML = `
                <input type="radio" name="question${index}" value="${option}">
                ${option}
            `;
            quizBlock.appendChild(label);
            quizBlock.appendChild(document.createElement('br')); // Add a line break
        });
        
        // Append the question block to the quiz container
        quizContainer.appendChild(quizBlock);
    });
}

// Function to gather answers and determine the user's focus
function processResults() {
    let selectedAnswers = [];
    
    // Collect the selected answers for each question
    quizData.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            selectedAnswers.push(selectedOption.value);
        }
    });

    // Check if all questions were answered
    if (selectedAnswers.length !== quizData.length) {
        resultContainer.innerHTML = "Please answer all questions.";
        return;
    }

    // Custom feedback based on the answers (you can adjust this logic)
    let feedback = "Thank you for your responses. Based on your answers:<br>";

    if (selectedAnswers.includes("I need help with a specific project.")) {
        feedback += "- We can connect you with resources to help you with your project.<br>";
    }
    
    if (selectedAnswers.includes("I am interested in one of your programs.")) {
        feedback += "- We'll provide more information on our programs to help you decide.<br>";
    }

    if (selectedAnswers.includes("Both—I'm interested in help and programs.")) {
        feedback += "- We’ll reach out with both project-specific help and program details.<br>";
    }

    // Display final result
    resultContainer.innerHTML = feedback;
}

// Event listener for the submit button to show the results
submitButton.addEventListener('click', processResults);

// Load the quiz when the page is first opened
loadQuiz();
