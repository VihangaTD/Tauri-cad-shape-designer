mod commands;
mod models;
mod services;
mod shapes;

use commands::generate_svg::generate_svg;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![generate_svg])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}