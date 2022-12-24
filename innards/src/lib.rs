use console_error_panic_hook;
use std::panic;
use wasm_bindgen::prelude::*;

mod app;
mod complex;
mod util;

use app::AppState;

#[wasm_bindgen]
pub fn initialise() {
    panic::set_hook(Box::new(console_error_panic_hook::hook));
}

#[wasm_bindgen]
pub fn create_app_state(canvas_width: u32, canvas_height: u32) -> AppState {
    AppState::new(canvas_width, canvas_height)
}
