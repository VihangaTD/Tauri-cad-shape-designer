use std::collections::HashMap;

use crate::models::shape::ShapeSvgData;
use crate::services::svg_generator::{
    create_polygon, filled_style, pack, read_required, validate_positive,
};

pub fn build_triangle_svg(parameters: &HashMap<String, f64>) -> Result<ShapeSvgData, String> {
    let width = validate_positive(read_required(parameters, "width")?, "width")?;
    let height = validate_positive(read_required(parameters, "height")?, "height")?;

    let points = vec![
        (width / 2.0, 0.0),
        (0.0, height),
        (width, height),
    ];

    let element = format!(
        r#"<polygon points="{points}" {style} />"#,
        points = create_polygon(&points),
        style = filled_style()
    );

    pack(element, width, height)
}