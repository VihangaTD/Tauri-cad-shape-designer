mod commands;
mod services;
mod shapes;
mod models;

use commands::generate_svg::generate_svg;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            generate_svg
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}