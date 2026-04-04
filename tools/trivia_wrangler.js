const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const jsonPath = path.join(__dirname, '../questions.json');

// --- Helper: Load File ---
function loadData() {
    try {
        const data = fs.readFileSync(jsonPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("\n[!] READ ERROR: Could not read or find questions.json in root.");
        return null;
    }
}

// --- Sub-Program: Validate ---
function validate() {
    try {
        const raw = fs.readFileSync(jsonPath, 'utf8');
        JSON.parse(raw);
        console.log("\n✅ YES: The file is valid JSON and correctly formatted.");
    } catch (err) {
        console.log("\n❌ NO: The file is NOT valid.");
        // Extract line number from the Error message if possible
        const lineMatch = err.message.match(/line (\d+)/);
        if (lineMatch) {
            console.log(`Potential issue found near line: ${lineMatch[1]}`);
        }
        console.log(`Error Detail: ${err.message}`);
    }
    returnToMenu();
}

// --- Sub-Program: Arrange ---
function arrange() {
    const data = loadData();
    if (!data) return returnToMenu();

    const eraOrder = ["Silent Era", "Golden Age", "New Hollywood", "80s", "90s", "Modern"];
    const diffOrder = ["Easy", "Medium", "Hard", "Director Cut"];
    const regionOrder = ["Domestic", "International"];

    const sorted = data.sort((a, b) => {
        if (eraOrder.indexOf(a.e) !== eraOrder.indexOf(b.e)) 
            return eraOrder.indexOf(a.e) - eraOrder.indexOf(b.e);
        if (diffOrder.indexOf(a.d) !== diffOrder.indexOf(b.d)) 
            return diffOrder.indexOf(a.d) - diffOrder.indexOf(b.d);
        return regionOrder.indexOf(a.r) - regionOrder.indexOf(b.r);
    });

    const newPath = path.join(__dirname, '../questions_sorted.json');
    try {
        fs.writeFileSync(newPath, JSON.stringify(sorted, null, 2));
        console.log(`\n✨ Success! Sorted copy created: questions_sorted.json`);
    } catch (err) {
        console.error("\n[!] WRITE ERROR: Could not save the sorted file.");
    }
    returnToMenu();
}

// --- Sub-Program: Simple Stats ---
function simpleStats() {
    const data = loadData();
    if (!data) return returnToMenu();

    const counts = { e: {}, d: {}, r: {} };
    data.forEach(q => {
        counts.e[q.e] = (counts.e[q.e] || 0) + 1;
        counts.d[q.d] = (counts.d[q.d] || 0) + 1;
        counts.r[q.r] = (counts.r[q.r] || 0) + 1;
    });

    console.log(`\n--- SIMPLE STATS ---`);
    console.log(`Total Questions: ${data.length}`);
    console.log(`\nBy Era:`, counts.e);
    console.log(`By Difficulty:`, counts.d);
    console.log(`By Region:`, counts.r);
    returnToMenu();
}

// --- Sub-Program: Complex Stats ---
function complexStats() {
    const data = loadData();
    if (!data) return returnToMenu();

    let report = "ERA | DIFFICULTY | REGION | COUNT\n------------------------------------\n";
    const matrix = {};

    data.forEach(q => {
        const key = `${q.e} | ${q.d} | ${q.r}`;
        matrix[key] = (matrix[key] || 0) + 1;
    });

    Object.keys(matrix).sort().forEach(k => {
        report += `${k} : ${matrix[k]}\n`;
    });

    console.log(`\n--- COMPLEX STATS ---`);
    console.log(report);
    
    const statsPath = path.join(__dirname, 'full_stats_report.txt');
    fs.writeFileSync(statsPath, report);
    console.log(`Detailed report saved to: tools/full_stats_report.txt`);
    
    returnToMenu();
}

// --- Navigation ---
function returnToMenu() {
    rl.question('\nPress Enter to Return to Menu...', () => {
        showMenu();
    });
}

function showMenu() {
    console.clear();
    console.log(`
====================================
      TRIVIA WRANGLER v1.0
====================================
 [V] Validate questions.json
 [A] Arrange/Sort File (Output New)
 [S] Simple Stats
 [C] Complex Stats (Full Matrix)
 [Q] Quit
====================================
    `);
    rl.question('Select an option: ', (choice) => {
        const c = choice.toUpperCase();
        if (c === 'V') validate();
        else if (c === 'A' || c === 'R') arrange();
        else if (c === 'S') simpleStats();
        else if (c === 'C') complexStats();
        else if (c === 'Q') process.exit();
        else showMenu();
    });
}

showMenu();