use std::collections::HashMap;

use crate::models::shape::ShapeSvgData;
use crate::services::svg_generator::{
    filled_style, pack, read_required, validate_positive,
};

pub fn build_circle_svg(parameters: &HashMap<String, f64>) -> Result<ShapeSvgData, String> {
    let radius = validate_positive(read_required(parameters, "radius")?, "radius")?;
    let diameter = radius * 2.0;

    let element = format!(
        r#"<circle cx="{r}" cy="{r}" r="{r}" {style} />"#,
        r = radius,
        style = filled_style()
    );

    pack(element, diameter, diameter)
}