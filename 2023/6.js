const part1 = (input) => {
    // number of ways you can beat the record in each race
    return input[1].map((highScore, i) => {
        const time = input[0][i];
        let win = 0;

        // i = sec to hold button
        for (let i = 1; i < time; i++) {
            if (i * (time - i) > highScore) {
                win++;
            }
        }
        return win;
    }).reduce((acc, w) => acc * w);
};

const part2 = (input) => {
    return part1(input.map(value => [Number(value.reduce((acc, x) => acc + x, ""))]));
};
  
const fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if (err) throw err;

    const input = data.split('\n').map((line) => {
        return line.split(':')[1].trim().split('  ').map(x => x.trim()).filter(x => x);;
    });

    console.log(part1(input));
    console.log(part2(input));
});
