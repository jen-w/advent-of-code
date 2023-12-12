const part1 = (input, multiplier = 1) => {
    const rowsToExpand = input.reduce((acc, row, i) => {
        if (!row.some(x => x !== ".")) {
            acc.push(i);
        }
        return acc;
    }, []);

    const colsToExpand = [];
    for (let i = 0; i < input[0].length; i++) {
        let expand = true;
        for (let j = 0; j < input.length; j++) {
            if (input[j][i] !== ".") {
                expand = false;
            }
        }
        if (expand) {
            colsToExpand.push(i);
        }
    }  

    const galaxies = [];
    input.forEach((row, r) => {
        row.forEach((item, c) => {
            if (item === "#") {
                galaxies.push([r, c]);
            }
        });
    });

    let sum = 0;
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            const g1 = galaxies[i];
            const g2 = galaxies[j];

            const crazyRowsCrossed = rowsToExpand.filter(r => {
                return r >= Math.min(g1[0], g2[0]) && r <= Math.max(g1[0], g2[0]);
            }).length * multiplier;
            const crazyColsCrossed = colsToExpand.filter(r => {
                return r >= Math.min(g1[1], g2[1]) && r <= Math.max(g1[1], g2[1]);
            }).length * multiplier;

            sum = sum + crazyRowsCrossed + crazyColsCrossed + Math.abs(g1[0] - g2[0]) + Math.abs(g1[1] - g2[1]);
        }
    }
    return sum;
}

const part2 = (input) => {
    return part1(input, 1000000 - 1);
}
  
import fs from "fs";
fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if (err) throw err;

    const input = data.split('\n').map(line => line.split(""));
    console.log(part1(input));
    console.log(part2(input));
});
