function jsfib(n) {
  // Not optimized with memoization on purpose
  if (n <= 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return jsfib(n - 1) + jsfib(n - 2);
}

WebAssembly.instantiateStreaming(fetch("http://localhost:8080/file.wasm")).then(
  (obj) => {
    console.time("js");
    console.log(jsfib(45));
    console.timeEnd("js");
    console.time("rust");
    console.log(obj.instance.exports.fib(45));
    console.timeEnd("rust");
  }
);
