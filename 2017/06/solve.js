function solve(input, part) {
    const banks = input[0].split('\t').map(Number);
    
    if (part === 1) {
        return countRedistributions(banks).redistributions;
    }
    else {
        return countRedistributions(banks).loopSize;
    }
    /*let banks = [0,2,7,0]
        //console.log(countRedistributions([0,2,7,0]));
    console.log(redistribute(banks))
    console.log(redistribute(banks))
    console.log(redistribute(banks))
    console.log(redistribute(banks))
    console.log(redistribute(banks))
*/
}

function findMaxIndex(arr) {
    let maxIndex = 0;
    for(let n = 1; n < arr.length; n++) {
        if (arr[n] > arr[maxIndex]) maxIndex = n;
    }
    return maxIndex;
}

function countRedistributions(state) {
    let seenStates = new Map();
    let key = state.toString()
    let redistributions = 0;
    while(!seenStates.has(key)) {
        seenStates.set(key, redistributions++);
        state = redistribute(state);
        key = state.toString();
    }
    return { redistributions: redistributions, loopSize: redistributions - seenStates.get(key) };
}

function redistribute(banks) {
    const maxIndex = findMaxIndex(banks);
    // redistribute
    let amount = banks[maxIndex];
    banks[maxIndex] = 0;
    for(let n = maxIndex + 1; amount > 0; n++, amount--) {
        banks[n % banks.length] += 1;
    }
    return banks;
}

const expected = part => part === 1 ? 4074 : 2793;

module.exports = {solve,expected};