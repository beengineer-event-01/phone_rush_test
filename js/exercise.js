console.log(1 + 2);

let num = 5;
num = 10;
console.log(num);

function sumFilteredEvens() {
  const numbers = [2, 4, 5, 10, 12, 15, 20, 22]
  // 演習問題 1
  // ここにコードを書いてください
  let sum = 0
  // for(let i = 0; i < length(numbers); i++){}
  for(let i = 0; i < 8; i++){
    if(numbers[i] % 2 == 0 && numbers[i] % 5 != 0){
      sum += numbers[i];
    }
  }
  numbers.forEach((number) => {
    if(number % 2 == 0){
      sum += number
    }
  })
  return sum;
}

const numbers = [2, 4, 5, 10, 12, 15, 20, 22];
console.log(sumFilteredEvens); // 関数の実行

function isPrime(number) {
  // 演習問題 2
  // ここにコードを書いてください
}

number = 5;
console.log(isPrime(number));

// console.log(numbers);
// numbers.pop();
// console.log(numbers);

// numbers.shift();
// console.log(numbers);

// numbers.push(100, 200);
// console.log(numbers);

// numbers.unshift(-1, -2);
// console.log(numbers);
