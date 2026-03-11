use std::collections::HashMap;

use crate::models::shape::ShapeSvgData;
use crate::services::svg_generator::{
    create_polygon, filled_style, pack, read_required, validate_positive,
};

pub fn build_trapezoid_svg(parameters: &HashMap<String, f64>) -> Result<ShapeSvgData, String> {
    let top_width = validate_positive(read_required(parameters, "topWidth")?, "topWidth")?;
    let bottom_width =
        validate_positive(read_required(parameters, "bottomWidth")?, "bottomWidth")?;
    let height = validate_positive(read_required(parameters, "height")?, "height")?;

    let canvas_width = top_width.max(bottom_width);
    let top_offset = (canvas_width - top_width) / 2.0;
    let bottom_offset = (canvas_width - bottom_width) / 2.0;

    let points = vec![
        (top_offset, 0.0),
        (top_offset + top_width, 0.0),
        (bottom_offset + bottom_width, height),
        (bottom_offset, height),
    ];

    let element = format!(
        r#"<polygon points="{points}" {style} />"#,
        points = create_polygon(&points),
        style = filled_style()
    );

    pack(element, canvas_width, height)
}