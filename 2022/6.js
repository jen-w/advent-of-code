// Day 6

// Part 1 & 2
const getFirstMarker = (buffer, numDistinct) => {
    return buffer.split('').findIndex((element, index, array) => {
        return numDistinct == new Set(array.slice(index - numDistinct, index)).size;
    });
};

const fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if (err) throw err;

    console.log(getFirstMarker(data, 4));
    console.log(getFirstMarker(data, 14));
});
