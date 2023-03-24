// Insertion Sort

let arr = [9,8,7,6,5,4,3,2,1]

for(let i = 1; i < arr.length; i++){
    let j = i;
    while(j > 0 && arr[j-1] > arr[j]){
        let temp = arr[j-1];
        arr[j-1] = arr[j];
        arr[j] = temp;
        j = j-1;
    }
}

console.log(arr)