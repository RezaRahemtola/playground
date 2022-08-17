mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    let val = format!("Hello {}", name);
    return val;
}

#[wasm_bindgen]
pub fn fib (n: i32) -> i32 {
    if n <= 0 {
        return 0;
    }
    if n== 1{
        return 1;
    }
    return fib (n-1)  + fib(n-2);
}
