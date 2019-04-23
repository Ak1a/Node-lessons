let a = [5, 4, 1, 3, 7, 9, 11, 2, 10, 9, 13, 15];
let again = true;

while(again){
    again = false;
    for (let i = 0, length = a.length; i < length; i++){
        if( i + 1 !== length && a[i] > a[i+1]){
            a.splice(i, 1);
            again = true;
        } 
    }
}

console.log(a);