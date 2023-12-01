const part1 = (input) => {
    return input.reduce((acc, line) => {
        const chars = line.split("");
        const firstNum = chars.find((c) => !isNaN(c));
        const lastNum = chars.reverse().find((c) => !isNaN(c));
        return acc + Number(`${firstNum}${lastNum}`);
    }, 0);
};

const part2 = (input) => {
    const map = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9};
    const keys = Object.keys(map);

    return input.reduce((acc, line) => {
        const nums = [];
        for (let i = 0; i < line.length; i++) {
            const sub = line.substring(i);
    
            if (!isNaN(line[i])) {
                nums.push(Number(line[i]));
            } else {
                for (let j = 0; j < keys.length; j++) {
                    const key = keys[j];
                    if (sub.startsWith(key)) {
                        nums.push(map[key]);
                    }
                }
            }
        }
        return acc + (nums[0] * 10) + nums[nums.length - 1];
    }, 0);
};
  
const fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if (err) throw err;

    const input = data.split('\n');
    console.log(part1(input));
    console.log(part2(input));
});
