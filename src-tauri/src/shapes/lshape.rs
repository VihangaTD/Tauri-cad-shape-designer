use std::collections::HashMap;

use crate::services::svg_generator::{
    create_polygon, filled_style, pack, read_required, validate_non_negative, validate_positive, ShapeSvgData,
};

pub fn build_lshape_svg(parameters: &HashMap<String, f64>) -> Result<ShapeSvgData, String> {
    let width = validate_positive(read_required(parameters, "width")?, "width")?;
    let height = validate_positive(read_required(parameters, "height")?, "height")?;
    let cutout_width = validate_non_negative(read_required(parameters, "cutoutWidth")?, "cutoutWidth")?;
    let cutout_height = validate_non_negative(read_required(parameters, "cutoutHeight")?, "cutoutHeight")?;

    if cutout_width >= width {
        return Err("cutoutWidth must be smaller than width".to_string());
    }

    if cutout_height >= height {
        return Err("cutoutHeight must be smaller than height".to_string());
    }

    let points = vec![
        (0.0, 0.0),
        (width, 0.0),
        (width, cutout_height),
        (cutout_width, cutout_height),
        (cutout_width, height),
        (0.0, height),
    ];

    let element = format!(
        r#"<polygon points="{points}" {style} />"#,
        points = create_polygon(&points),
        style = filled_style()
    );

    pack(element, width, height)
}