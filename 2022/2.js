// Day 2

// Part 1
const getTotalScore = (matches) => {
    const MAPPING = {
        A: 1, // rock
        B: 2, // paper
        C: 3, // scissors
        X: 1,
        Y: 2,
        Z: 3
    };

    return matches.reduce((acc, match) => {
        const opponent = MAPPING[match[0]];
        const me = MAPPING[match[match.length - 1]];
        if (!opponent || !me) return acc;

        let score = me;
        if (opponent === me) {
            score += 3;
        } else if ((me === opponent + 1) || (me === 1 && opponent === 3)) {
            score += 6;
        }
        return acc + score;
    }, 0);
};

// Part 2
const getTotalScoreAgain = (matches) => {
    const MAPPING = {
        A: 1, // rock
        B: 2, // paper
        C: 3, // scissors
        X: 0, // loss
        Y: 3, // draw
        Z: 6 // win
    };

    return matches.reduce((acc, match) => {
        const opponent = MAPPING[match[0]];
        const result = MAPPING[match[match.length - 1]];
        if (opponent === undefined || result === undefined) return acc;

        let score = result;
        if (result === 3) {
            score += opponent;
        } else if (result === 6 && opponent === 3) {
            score += 1;
        } else if (result === 6) {
            score += 1 + opponent;
        } else if (opponent === 1) {
            score += 3;
        } else {
            score += -1 + opponent;
        }
        return acc + score;
    }, 0);
};

const fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if (err) throw err;
    const input = data.split('\n');
    console.log(getTotalScore(input));
    console.log(getTotalScoreAgain(input));
});
