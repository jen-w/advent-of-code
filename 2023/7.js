const PART_2_RELATIVE_CARD_VALUE = { A: 14, K: 13, Q: 12, J: 1, T: 10 };

const getType = (hand, wildcardInPlay) => {
    const map = new Map();
    hand.split("").forEach((card) => {
        map.set(card, (map.get(card) || 0) + 1);
    });

    if (wildcardInPlay) {
        if (map.has("J")) {
            const jokers = map.get("J");
            map.delete("J");

            const counts = Array.from(map.entries());
            counts.sort((a, b) => {
                if (a[1] !== b[1]) {
                    return b[1] - a[1];
                }

                const aCard = isNaN(a[0]) ? PART_2_RELATIVE_CARD_VALUE[a[0]] : a[0];
                const bCard = isNaN(b[0]) ? PART_2_RELATIVE_CARD_VALUE[b[0]] : b[0];
                return aCard - bCard;
            });

            if (jokers === 5) {
                map.set("A", jokers);
            } else {
                map.set(counts[0][0], counts[0][1] + jokers);
            }
        }
    }

    if (map.size === 1) {
        return 1; // 5 of a kind
    } else if (map.size === 4) {
        return 6; // one pair
    } else if (map.size === 5) {
        return 7; // high card
    } else if (map.size === 2) {
        return Array.from(map.values()).includes(4) ? 2 : 3; // 4 of a kind, full house
    }
    return Array.from(map.values()).includes(3) ? 4 : 5; // 3 of a kind, two pair
};

const getHandsSortFunction = (jokerValue) => {
    return (a, b) => {
        const RELATIVE_CARD_VALUE = { A: 14, K: 13, Q: 12, J: jokerValue, T: 10 };
        if (a.type === b.type) {
            for (let i = 0; i < a.hand.length; i++) {
                const aCard = isNaN(a.hand[i]) ? RELATIVE_CARD_VALUE[a.hand[i]] : a.hand[i];
                const bCard = isNaN(b.hand[i]) ? RELATIVE_CARD_VALUE[b.hand[i]] : b.hand[i];
                if (aCard !== bCard) {
                    return aCard - bCard;
                }
            }
        }
        return b.type - a.type;
    };
};

const part1 = (input) => {
    const hands = input.map(x => {
        return { bid: x[1], hand: x[0], type: getType(x[0]) };
    });
    hands.sort(getHandsSortFunction(11));

    return hands.reduce((acc, h, i) => acc + (h.bid * (i + 1)), 0);
};

const part2 = (input) => {
    const hands = input.map(x => {
        return { bid: x[1], hand: x[0], type: getType(x[0], true) };
    });
    hands.sort(getHandsSortFunction(1));

    return hands.reduce((acc, h, i) => acc + (h.bid * (i + 1)), 0);
};
  
const fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if (err) throw err;

    const input = data.split('\n').map((line) => line.split(' '));

    console.log(part1(input));
    console.log(part2(input));
});
