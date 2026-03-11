use std::collections::HashMap;

use crate::models::shape::ShapeSvgData;
use crate::services::svg_generator::{
    filled_style, pack, read_required, validate_positive,
};

pub fn build_rectangle_svg(parameters: &HashMap<String, f64>) -> Result<ShapeSvgData, String> {
    let width = validate_positive(read_required(parameters, "width")?, "width")?;
    let height = validate_positive(read_required(parameters, "height")?, "height")?;

    let element = format!(
        r#"<rect x="0" y="0" width="{width}" height="{height}" {style} />"#,
        width = width,
        height = height,
        style = filled_style()
    );

    pack(element, width, height)
}