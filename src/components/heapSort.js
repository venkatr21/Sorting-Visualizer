function heapify(input, i,changes, len) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;
    if (left < len && input[left] > input[max]){
        max = left;
    }
    if (right < len && input[right] > input[max]){
        max = right;
    }
    if (max !== i) {
        swap(input, i, max);
        heapify(input, max, changes, len);
    }
    changes.push([i,max,input[i],input[max],max])
}

function swap(input, index_A, index_B) {
    var temp = input[index_A];
    input[index_A] = input[index_B];
    input[index_B] = temp;
}

export function heapSort(input) {
    var changes = [];
    var len = input.length
    for (var i = Math.floor(len / 2); i >= 0; i -= 1){
        heapify(input, i, changes, len);
    }
    for (i = len - 1; i > 0; i--) {
        swap(input, 0, i);
        changes.push([0,i,input[0],input[i],i])
        len--;
        heapify(input, 0, changes, len);
    }
    console.log(input)
    return changes;
}