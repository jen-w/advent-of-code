// Day 4

// Part 1
const countFullyContained = (pairs) => {
    return pairs.reduce((acc, pair) => {
        const firstRangeIsBigger = pair[0][1] - pair[0][0] > pair[1][1] - pair[1][0];
        const bigger = firstRangeIsBigger ? pair[0] : pair[1];
        const smaller = firstRangeIsBigger ? pair[1] : pair[0];

        return (smaller[0] < bigger[0] || smaller[1] > bigger[1]) ? acc : acc + 1;
    }, 0);
};

// Part 2
const countOverlapping = (pairs) => {
    return pairs.reduce((acc, pair) => {
        const firstRangeStartsEarlier = pair[0][0] < pair[1][0];
        const earlier = firstRangeStartsEarlier ? pair[0] : pair[1];
        const later = firstRangeStartsEarlier ? pair[1] : pair[0];

        return earlier[1] < later[0] ? acc : acc + 1;
    }, 0);
};

const fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if (err) throw err;
    const input = data.split('\n').filter(item => !!item).map(row => {
        return row.split(',').map(range => {
            return range.split('-').map(number => parseInt(number))
        });
    });

    console.log(countFullyContained(input));
    console.log(countOverlapping(input));
});
