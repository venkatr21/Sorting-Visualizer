export function mergeSort(array) {
    var arr = array.slice();
    var changes = [];
    mergeSortHandler(array, 0, array.length - 1, arr, changes);
    return [changes,array];
}
  
function mergeSortHandler(array,st,en,arr,changes){
    if (st === en) return;
    const mid = Math.floor((st + en) / 2);
    mergeSortHandler(arr, st, mid, array, changes);
    mergeSortHandler(arr, mid + 1, en, array, changes);
    sortByMerge(array, st, mid, en, arr, changes);
}
  
  function sortByMerge(array, st, mid, en, arr, changes) {
    let k = st;
    let i = st;
    let j = mid + 1;
    while (i <= mid && j <= en) {
      if (arr[i] <= arr[j]) {
        changes.push([i, j, k, arr[i]]);
        array[k++] = arr[i++];
      } else {
        changes.push([i, j, k, arr[j]]);
        array[k++] = arr[j++];
      }
    }
    while (i <= mid) {
      changes.push([i,i,k, arr[i]]);
      array[k++] = arr[i++];
    }
    while (j <= en) {
      changes.push([i,i,k, arr[j]]);
      array[k++] = arr[j++];
    }
  }