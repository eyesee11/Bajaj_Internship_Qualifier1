// math operations

// generate fibonacci series
function generateFibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib;
}

// check if number is prime
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

// filter prime numbers from array
function filterPrimes(numbers) {
  return numbers.filter((num) => isPrime(num));
}

// calculate gcd
function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// calculate hcf
function calculateHCF(numbers) {
  if (numbers.length === 0) return 0;
  if (numbers.length === 1) return Math.abs(numbers[0]);

  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result = gcd(result, numbers[i]);
    if (result === 1) return 1;
  }
  return result;
}

// calculate lcm of two numbers
function lcm(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  if (a === 0 || b === 0) return 0;
  return (a * b) / gcd(a, b);
}

// calculate lcm of array
function calculateLCM(numbers) {
  if (numbers.length === 0) return 0;
  if (numbers.length === 1) return Math.abs(numbers[0]);

  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result = lcm(result, numbers[i]);
  }
  return result;
}

module.exports = {
  generateFibonacci,
  filterPrimes,
  calculateHCF,
  calculateLCM,
  isPrime,
  gcd,
  lcm,
};
