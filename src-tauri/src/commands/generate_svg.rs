use crate::models::shape::ShapeConfig;
use crate::services::svg_generator::generate_svg_document;

#[tauri::command]
pub fn generate_svg(shape: ShapeConfig) -> Result<String, String> {
    generate_svg_document(&shape)
}