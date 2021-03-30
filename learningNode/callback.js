
let sumOfTwoNumber = (a, b, cb) => {
    let sum = a + b;
    setInterval(() => {
        return cb(sum);
    }, 1000);
    return cb(sum + 3);
}





let sum2 = sumOfTwoNumber(3,5, (sum)=>{
    console.log("sum = " + sum);
    return sum;
   
})

console.log(sum2);
