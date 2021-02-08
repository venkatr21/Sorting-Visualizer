function swap(array, leftIndex, rightIndex){
    var temp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;
}
function partition(array, left, right, changes) {
    var pivotEle = Math.floor((right + left) / 2);
    var pivot = array[pivotEle], i = left, j = right;
    while (i <= j) {
        while (array[i] < pivot) {
            changes.push([i,j,array[i],array[j],pivotEle]);
            i++;
        }
        while (array[j] > pivot) {
            changes.push([i,j,array[i],array[j],pivotEle]);
            j--;
        }
        if (i <= j) {
            swap(array, i, j);
            changes.push([i,j,array[i],array[j],pivotEle]);
            i++;
            j--;
        }else{
            changes.push([i,j,array[i],array[j],pivotEle]);
        }
    }
    return i;
}

export function quickSort(array, left, right, changes) {
    var index;
    if (array.length > 1) {
        index = partition(array, left, right, changes);
        if (left < index - 1) {
            quickSort(array, left, index - 1, changes);
        }
        if (index < right) {
            quickSort(array, index, right, changes);
        }
    }
    return changes;
}