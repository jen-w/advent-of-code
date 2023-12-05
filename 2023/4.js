const part1 = (input) => {
    return input.reduce((acc, card) => {
        // Get intersection of two lists of numbers.
        const matches = card[0].filter(num => card[1].includes(num)).length;
        return acc + (matches > 0 ? Math.pow(2, matches - 1) : 0);
    }, 0);
};

const part2 = (input) => {
    const stack = Array.from({length: input.length}, (_, i) => i + 1);
    const matches = new Array(input.length + 1); // memoization

    let processed = 0;
    while (stack.length > 0) {
        const cardNumber = stack.shift();
        const card = input[cardNumber - 1];
        if (matches[cardNumber] === undefined) {
            matches[cardNumber] = card[0].filter(num => card[1].includes(num)).length;
        }
        
        for (let i = 1; i <= matches[cardNumber]; i++) {
            stack.unshift(cardNumber + i);
        }

        processed++;
    }

    return processed;
};
  
const fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if (err) throw err;

    const input = data.split('\n').map((line) => {
        return line.split(": ")[1].split(" | ").map((nums) => {
            return nums.split(" ").filter(n => n).map((n) => Number(n));
        });
    });

    console.log(part1(input));
    console.log(part2(input));
});
