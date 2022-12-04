// Day 3

const LOWER_CASE_A = 'a'.charCodeAt(0);
const UPPER_CASE_A = 'A'.charCodeAt(0);

// Part 1
const getPriorities = (rows) => {
    const getRepeatedItem = (row) => {
        const half = row.length / 2;
        const items = row.split('');
        const compartment1 = new Set(items.slice(0, half));
        return items.slice(half).find(item => compartment1.has(item))
    }

    return rows.reduce((acc, curr) => {
        const code = getRepeatedItem(curr).charCodeAt(0);
        const normalizationValue = code < LOWER_CASE_A ? UPPER_CASE_A - 27 : LOWER_CASE_A - 1;
        return acc + code - normalizationValue;
    }, 0);
};

// Part 2
const getPrioritiesAgain = (rows) => {
    const getRepeatedItem = (group) => {
        return group.reduce((acc, curr) => {
            if (!acc) return curr;
            const seen = new Set(acc.split(""));
            return curr.split("").reduce((acc, curr) => {
                return seen.has(curr) ? acc + curr : acc;
            }, "");
        });
    }

    let result = 0;
    for (let i = 0; i < rows.length; i += 3) {
        const code = getRepeatedItem([rows[i], rows[i+1], rows[i+2]]).charCodeAt(0);
        const normalizationValue = code < LOWER_CASE_A ? UPPER_CASE_A - 27 : LOWER_CASE_A - 1;
        result = result + code - normalizationValue;
    }
    return result;
};

const fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if (err) throw err;
    const input = data.split('\n').filter(item => !!item);

    console.log(getPriorities(input));
    console.log(getPrioritiesAgain(input));
});
