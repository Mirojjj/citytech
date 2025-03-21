/* 
The given problem can be solved using merge sort where we divide the given array into two halves and start the counter from two sides left and right.
Based on these index we can check for the "and" condition that is 
a) i<j or right is greater than left
and 
b) array[i]>array[j] or left element is greater than the right element 
if these two conditions are matched we calcaulate the inversion counter and finally the inversion are retured by countInversions function 
and stored in the totalInversions varaible and are finally console logged as output.
*/

function countInversions(arr) {
  // Helper function to perform merge sort and count inversions
  function mergeAndCount(arr, left, mid, right) {
    // Create temporary arrays for the left and right halves
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;
    let inversions = 0;

    // Merge the two halves and count inversions
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k++] = leftArr[i++];
      } else {
        arr[k++] = rightArr[j++];
        inversions += mid + 1 - (left + i);
      }
    }

    // Copy remaining elements of leftArr, if any
    while (i < leftArr.length) {
      arr[k++] = leftArr[i++];
    }

    // Copy remaining elements of rightArr, if any
    while (j < rightArr.length) {
      arr[k++] = rightArr[j++];
    }

    return inversions;
  }

  // Recursive function to sort the array and count inversions
  function sortAndCount(arr, left, right) {
    let inversions = 0;
    if (left < right) {
      const mid = Math.floor((left + right) / 2);

      // Count inversions in the left half
      inversions += sortAndCount(arr, left, mid);

      // Count inversions in the right half
      inversions += sortAndCount(arr, mid + 1, right);

      // Count inversions during the merge step
      inversions += mergeAndCount(arr, left, mid, right);
    }
    return inversions;
  }

  // first call the sortAndCount function with the necessary parameters
  return sortAndCount(arr, 0, arr.length - 1);
}

const arr = [8, 4, 2, 1];
const totalInversions = countInversions(arr);
console.log("Total inversions:", totalInversions);
