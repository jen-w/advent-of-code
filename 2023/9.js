const part1 = (input) => {
    return input.reduce((acc, line) => {
        let curr = line;
        let allZero = false;
        const last = [];
        while (!allZero) {
            let diff = [];
            allZero = true;
            for (let i = 1; i < curr.length; i++) {
                diff.push(curr[i] - curr[i - 1]);
                allZero = allZero && (diff[diff.length - 1] === 0);
            }
            last.push(diff[diff.length - 1]);
            curr = diff;
        }
        return acc + last.reduce((acc, value) => acc + value, line[line.length - 1]);
    }, 0);
};

const part2 = (input) => {
    return part1(input.map(line => line.reverse()));
}
  
import fs from "fs";
fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if (err) throw err;

    const input = data.split('\n').map(line => line.split(" ").map(x => Number(x)));
    console.log(part1(input));
    console.log(part2(input));
});
