let questionsDB = [];

async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        const data = await response.json();

        questionsDB = data.filter(item => item.q);
        console.log("Questions loaded:", questionsDB.length);
    } catch (error) {
        console.error("Failed to load questions.json:", error);
    }
}

loadQuestions();

const diffs = ["Easy", "Medium", "Hard", "Director Cut"];
const eras = ["All", "Silent Era", "Golden Age", "New Hollywood", "80s", "90s", "Modern"];

let state = {
    diff: "Easy", era: "All", region: "Domestic",
    score: 0, streak: 0, currentIdx: 0, activeSet: []
};

function toggleDrawer() {
    const d = document.getElementById('drawer');
    d.style.display = d.style.display === 'block' ? 'none' : 'block';
}

document.getElementById('diff-toggle').onclick = (e) => {
    state.diff = diffs[(diffs.indexOf(state.diff) + 1) % diffs.length];
    e.target.innerText = state.diff;
};
document.getElementById('era-toggle').onclick = (e) => {
    state.era = eras[(eras.indexOf(state.era) + 1) % eras.length];
    e.target.innerText = state.era;
};
document.getElementById('region-toggle').onclick = (e) => {
    state.region = state.region === "Domestic" ? "International" : "Domestic";
    e.target.innerText = state.region;
};

function startGame() {
    // Error Check: If DB is empty, the fetch hasn't finished yet.
    if (questionsDB.length === 0) {
        console.log("Waiting for data...");
        return; 
    }

    let pool = questionsDB.filter(q => 
        q.d === state.diff && 
        q.r === state.region && 
        (state.era === "All" || q.e === state.era)
    );

    if (pool.length < 5) {
        let fillers = questionsDB.filter(q => q.d === state.diff && !pool.includes(q));
        pool = [...pool, ...fillers];
    }

    if (pool.length < 5) pool = [...questionsDB];

    state.activeSet = pool.sort(() => 0.5 - Math.random()).slice(0, 5);
    state.score = 0;
    state.currentIdx = 0;
    document.getElementById('star-display').innerText = '☆☆☆☆☆';

    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('quiz-box').style.display = 'block';
    document.getElementById('drawer').style.display = 'none';
    renderQuestion();
}

function renderQuestion() {
    const q = state.activeSet[state.currentIdx];
    if (!q) return showResults();

    document.getElementById('question-text').innerText = q.q;
    const container = document.getElementById('options-container');
    container.innerHTML = '';

    q.a.forEach((opt, i) => {
        const btn = document.createElement('div');
        btn.className = 'option';
        btn.innerText = opt;
        btn.onclick = () => {
            const btns = document.querySelectorAll('.option');
            btns.forEach(b => b.style.pointerEvents = 'none');
            if(i === q.c) {
                btn.classList.add('correct');
                state.score++;
                document.getElementById('star-display').innerText = '⭐'.repeat(state.score) + '☆'.repeat(5 - state.score);
            }
            else { 
                btn.classList.add('wrong'); 
                btns[q.c].classList.add('correct'); 
            }
            setTimeout(() => {
                state.currentIdx++;
                if(state.currentIdx < 5) renderQuestion();
                else showResults();
            }, 800);
        };
        container.appendChild(btn);
    });
}

function showResults() {
    document.getElementById('quiz-box').style.display = 'none';
    const res = document.getElementById('result-screen');
    res.style.display = 'block';
    const won = state.score >= 3;
    document.getElementById('outcome-text').innerText = won ? "VICTORY!" : "GAME OVER";
    document.getElementById('score-text').innerText = '⭐'.repeat(state.score) + '☆'.repeat(5 - state.score);
    state.streak = won ? state.streak + 1 : 0;
    document.getElementById('streak-display').innerText = `STREAK: ${state.streak}`;
}

function toggleTheme() {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    // Close the drawer after selection
    document.getElementById('drawer').style.display = 'none';
}

// Check for saved preference on page load
window.onload = () => {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
    }
};