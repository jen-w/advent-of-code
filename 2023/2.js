const part1 = (input) => {
    return input.reduce((acc, game, index) => {
        const isInvalid = game.some((combo) => {
            return combo.red > 12 || combo.green > 13 || combo.blue > 14;
        });
        return acc + (isInvalid ? 0 : index);
    }, 0);
};

const part2 = (input) => {
    return input.slice(1).reduce((acc, game) => {
        const winner = game.reduce((min, combo) => {
            Object.keys(combo).forEach(key => {
                if (combo[key] > min[key]) {
                    min[key] = combo[key];
                }
            })
            return min;
        });

        return acc + Object.values(winner).reduce((product, val) => val * product, 1);
    }, 0);
};
  
const fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if (err) throw err;

    // Absolute insanity.
    const input = [[]];
    data.split('\n').forEach((line) => {
        let rounds = line.split(" ").slice(2).join(" ").split("; ").map((round) => {
            const combo = { red: 0, green: 0, blue: 0 };
            round.split(", ").forEach((pair) => {
                const pull = pair.split(" ");
                combo[pull[1]] = Number(pull[0]);
            });
            return combo;
        });

        input.push(rounds);
    });

    console.log(part1(input));
    console.log(part2(input));
});
