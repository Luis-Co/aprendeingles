
        document.addEventListener('DOMContentLoaded', function () {
            // Initialize lesson progress
            let totalQuestions = document.querySelectorAll('.answer-input, .quiz-option').length;
            let completedQuestions = 0;
            let correctAnswers = 0;
            let exerciseStatus = {};

            // Add event listeners to check answer buttons
            const checkButtons = document.querySelectorAll('.check-answers');
            checkButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const quizSection = this.closest('.quiz-section');
                    const quizSectionId = Array.from(document.querySelectorAll('.quiz-section')).indexOf(quizSection);
                    const inputs = quizSection.querySelectorAll('.answer-input');
                    const options = quizSection.querySelectorAll('.quiz-option');
                    const feedback = quizSection.querySelector('.answer-feedback');

                    let allCorrect = true;
                    let feedbackHTML = '';
                    let exerciseCorrect = 0;
                    let exerciseTotal = inputs.length + options.length;

                    // Check if this exercise was already completed
                    const wasCompleted = exerciseStatus[quizSectionId] && exerciseStatus[quizSectionId].completed;

                    // Check input answers
                    inputs.forEach(input => {
                        const userAnswer = input.value.trim().toLowerCase();
                        const correctAnswer = input.getAttribute('data-answer').toLowerCase();

                        if (userAnswer === correctAnswer) {
                            input.style.borderColor = '#4cc9f0';
                            input.classList.add('correct');
                            exerciseCorrect++;
                        } else {
                            input.style.borderColor = '#f72585';
                            input.classList.add('incorrect');
                            allCorrect = false;
                            feedbackHTML += `<p>For "${input.previousElementSibling ? input.previousElementSibling.textContent : 'this question'}", the correct answer is "${correctAnswer}"</p>`;
                        }

                        // Update completed questions count if this is a new answer
                        if (userAnswer && !input.hasAttribute('data-answered')) {
                            completedQuestions++;
                            input.setAttribute('data-answered', 'true');
                        }
                    });

                    // Check option answers
                    options.forEach(option => {
                        if (option.classList.contains('selected')) {
                            const isCorrect = option.getAttribute('data-correct') === 'true';

                            if (isCorrect) {
                                option.style.borderColor = '#4cc9f0';
                                option.classList.add('correct');
                                exerciseCorrect++;
                            } else {
                                option.style.borderColor = '#f72585';
                                option.classList.add('incorrect');
                                allCorrect = false;
                                feedbackHTML += `<p>"${option.textContent}" is not the correct answer</p>`;
                            }

                            // Update completed questions count if this is a new answer
                            if (!option.hasAttribute('data-answered')) {
                                completedQuestions++;
                                option.setAttribute('data-answered', 'true');
                            }
                        }
                    });

                    // Update correct answers count if this exercise wasn't already completed
                    if (!wasCompleted && allCorrect) {
                        correctAnswers += exerciseTotal;
                    } else if (!wasCompleted) {
                        correctAnswers += exerciseCorrect;
                    }

                    // Save exercise status in memory
                    exerciseStatus[quizSectionId] = {
                        completed: allCorrect,
                        score: exerciseCorrect,
                        total: exerciseTotal
                    };

                    // Show feedback
                    if (allCorrect) {
                        feedback.innerHTML = '<p>All answers correct! Well done! 🎉</p>';
                        feedback.classList.add('correct');
                        feedback.classList.remove('incorrect');
                    } else {
                        feedback.innerHTML = '<p>Some answers need correction:</p>' + feedbackHTML;
                        feedback.classList.add('incorrect');
                        feedback.classList.remove('correct');
                    }

                    feedback.style.display = 'block';

                    // Update progress and score displays
                    updateProgressBar();
                    updateScoreDisplay();

                    // Check if all exercises are completed
                    checkAllExercisesCompleted();
                });
            });

            // Add event listeners to option buttons
            const options = document.querySelectorAll('.quiz-option');
            options.forEach(option => {
                option.addEventListener('click', function () {
                    // Remove any previous selections in this question group
                    const parent = this.closest('.quiz-options');
                    parent.querySelectorAll('.quiz-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });

                    // Select this option
                    this.classList.add('selected');
                });
            });

            // Add event listeners to reset buttons
            const resetButtons = document.querySelectorAll('.reset-exercise');
            resetButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const quizSection = this.closest('.quiz-section');
                    const quizSectionId = Array.from(document.querySelectorAll('.quiz-section')).indexOf(quizSection);
                    const inputs = quizSection.querySelectorAll('.answer-input');
                    const options = quizSection.querySelectorAll('.quiz-option');
                    const feedback = quizSection.querySelector('.answer-feedback');

                    inputs.forEach(input => {
                        input.value = '';
                        input.style.borderColor = '';
                        input.classList.remove('correct', 'incorrect');

                        // Update completed questions count if this was answered
                        if (input.hasAttribute('data-answered')) {
                            completedQuestions--;
                            input.removeAttribute('data-answered');
                        }
                    });

                    options.forEach(option => {
                        option.classList.remove('selected', 'correct', 'incorrect');
                        option.style.borderColor = '';

                        // Update completed questions count if this was answered
                        if (option.hasAttribute('data-answered')) {
                            completedQuestions--;
                            option.removeAttribute('data-answered');
                        }
                    });

                    feedback.style.display = 'none';

                    // Reset exercise status
                    const exerciseId = Array.from(document.querySelectorAll('.quiz-section')).indexOf(quizSection);
                    if (exerciseStatus[exerciseId]) {
                        correctAnswers -= exerciseStatus[exerciseId].score;
                        delete exerciseStatus[exerciseId];
                    }

                    // Update progress and score displays
                    updateProgressBar();
                    updateScoreDisplay();
                });
            });

            // Function to update progress bar
            function updateProgressBar() {
                const progressBar = document.getElementById('progress-bar');
                const progress = totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0;
                progressBar.style.width = progress + '%';
            }

            // Function to update score display
            function updateScoreDisplay() {
                const scoreDisplay = document.getElementById('score-display');
                const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
                scoreDisplay.textContent = `Score: ${score}%`;
            }

            // Function to check if all exercises are completed
            function checkAllExercisesCompleted() {
                const exercises = document.querySelectorAll('.quiz-section');
                let allCompleted = true;

                for (let i = 0; i < exercises.length; i++) {
                    if (!exerciseStatus[i] || !exerciseStatus[i].completed) {
                        allCompleted = false;
                        break;
                    }
                }

                if (allCompleted) {
                    const completionBadge = document.getElementById('completion-badge');
                    const finalScore = document.getElementById('final-score');
                    const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

                    finalScore.textContent = score;
                    completionBadge.style.display = 'block';

                    // Scroll to completion badge
                    completionBadge.scrollIntoView({ behavior: 'smooth' });
                }
            }

            // Initialize progress display
            updateProgressBar();
            updateScoreDisplay();

            // Load footer from external file
            function loadFooter() {
                fetch('../footer.html')
                    .then(response => response.text())
                    .then(data => {
                        document.getElementById('footer-container').innerHTML = data;
                    })
                    .catch(error => {
                        console.error('Error loading footer:', error);
                    });
            }

            loadFooter();
        });
    