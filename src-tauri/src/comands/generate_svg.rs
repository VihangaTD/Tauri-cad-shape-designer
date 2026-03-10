use crate::models::shape::ShapeInput;
use crate::services::svg_generator::generate_svg_document;

#[tauri::command]
pub fn generate_svg(shape: ShapeInput) -> Result<String, String> {
    generate_svg_document(&shape)
}