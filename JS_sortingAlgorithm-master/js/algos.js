// Converts from degrees to radians.
Number.prototype.toRadians = function() {
  return this * Math.PI / 180;
};


// Calculates the distance between Grenoble and the given city
function distanceFromGrenoble(city) {
  console.log(city);
  var GrenobleLat = 45.166667;
  var GrenobleLong = 5.716667;
  const R = 6371; // km
  const φ1 = GrenobleLat * Math.PI / 180; // φ, λ in radians
  const φ2 = city.latitude * Math.PI / 180;
  const Δφ = (city.latitude-GrenobleLat) * Math.PI / 180;
  const Δλ = (city.longitude-GrenobleLong) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  // in km
  return R * c;
}

// Swap 2 values in array csvData
// i is the index of the first city
// j is the index of the second city
function swap(i,j) {
  displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)
  let temp = csvData[i];
  csvData[i] = csvData[j];
  csvData[j] = temp;

}

// Returns true if city with index i in csvData is closer to Grenoble than city with index j
// i is the index of the first city
// j is the index of the second city
function isLess(i, j) {
  displayBuffer.push(['compare', i, j]); // Do not delete this line (for display)
  return csvData[i].dist < csvData[j].dist;
}


function insertsort() {
  for (let i = 1; i <= csvData.length; i++) {
    for (let j = i - 1; j > 0 && isLess(j, j-1); j--) {
      swap(j, j-1)
    }
  }
}

function selectionsort() {
  for (let i = 0; i < csvData.length; i++) {
    for (let j = i + 1; j < csvData.length; j++) {
      if (isLess(j, i)) {
        swap(i, j);
      }
    }
  }
  return csvData;
}

function bubblesort() {
  let swapped;
  let count = 0;
  do {
    swapped = false;
    for (let i = 0; i < csvData.length - 1 - count; i++) {
      if (isLess(i + 1, i)) {
        swap(i + 1, i);
        swapped = true;
      }
    }
    count ++;
  } while (swapped);
  return csvData;

}

function shellsort() {
  // for (let i = csvData.length / 2 ; i < csvData.length; i++) {
  //
  // }
}

function mergesort() {
  let tempArray = JSON.parse(JSON.stringify(csvData))
  merge(tempArray)

  for (let i = 0; i < csvData.length; i++) {
    let index = csvData.findIndex(element => element.nom_commune === tempArray[i].nom_commune)
    swap(index, i)
  }
}

function merge(array) {
  if (array.length > 1) {
    const cutInHalf = Math.floor(array.length / 2);
    const left = array.slice(0, cutInHalf);
    const right = array.slice(cutInHalf, array.length);

    merge(left);
    merge(right);

    let leftI = 0;
    let rightI = 0;
    let index = 0;
    while (leftI < left.length && rightI < right.length) {
      if(isLess(csvData.findIndex(element => element.nom_commune === left[leftI].nom_commune),
                csvData.findIndex(element => element.nom_commune === right[rightI].nom_commune))) {
        array[index] = left[leftI];
        leftI ++;
      } else {
        array[index] = right[rightI];
        rightI ++;
      }
      index ++;
    }

    while(leftI < left.length) {
      array[index] = left[leftI];
      leftI ++;
      index ++;
    }

    while(rightI < right.length) {
      array[index] = right[rightI];
      rightI ++;
      index ++;
    }
  }
  return array;
}

function heapsort()
{

}

function quicksort()
{
  console.log("quicksort - implement me !");
}
function quick3sort()
{
  console.log("quick3sort - implement me !");
}


function sort(algo)
{
  switch (algo)
  {
    case 'insert': insertsort();break;
    case 'select': selectionsort();break;
    case 'bubble': bubblesort();break;
    case 'shell': shellsort();break;
    case 'merge': mergesort();break;
    case 'heap': heapsort();break;
    case 'quick': quicksort();break;
    case 'quick3': quick3sort();break;
    default: throw 'Invalid algorithm ' + algo;
  }
}
