use crate::models::shape::ShapeInput;
use crate::shapes::{
    circle::build_circle_svg,
    lshape::build_lshape_svg,
    rectangle::build_rectangle_svg,
    trapezoid::build_trapezoid_svg,
    triangle::build_triangle_svg,
};

struct ShapeSvgData {
    element: String,
    width: f64,
    height: f64,
}

pub fn generate_svg_document(shape: &ShapeInput) -> Result<String, String> {
    let shape_data = match shape.shape_type.as_str() {
        "rectangle" => build_rectangle_svg(&shape.parameters)?,
        "circle" => build_circle_svg(&shape.parameters)?,
        "triangle" => build_triangle_svg(&shape.parameters)?,
        "lshape" => build_lshape_svg(&shape.parameters)?,
        "trapezoid" => build_trapezoid_svg(&shape.parameters)?,
        other => {
            return Err(format!("Unsupported shape type: {}", other));
        }
    };

    let padding = 40.0;
    let canvas_width = shape_data.width + padding * 2.0;
    let canvas_height = shape_data.height + padding * 2.0;

    let center_x = canvas_width / 2.0;
    let center_y = canvas_height / 2.0;

    let translate_x = padding;
    let translate_y = padding;

    let scale_x = if shape.flip_x { -1.0 } else { 1.0 };
    let scale_y = if shape.flip_y { -1.0 } else { 1.0 };

    let transform = format!(
        "translate({cx},{cy}) rotate({rot}) scale({sx},{sy}) translate({tx},{ty}) translate({neg_cx},{neg_cy})",
        cx = center_x,
        cy = center_y,
        rot = shape.rotation,
        sx = scale_x,
        sy = scale_y,
        tx = translate_x,
        ty = translate_y,
        neg_cx = -(shape_data.width / 2.0),
        neg_cy = -(shape_data.height / 2.0),
    );

    let svg = format!(
        r#"<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
  <rect x="0" y="0" width="{w}" height="{h}" fill="white" />
  <g transform="{transform}">
    {element}
  </g>
</svg>"#,
        w = canvas_width,
        h = canvas_height,
        transform = transform,
        element = shape_data.element
    );

    Ok(svg)
}

pub(crate) fn create_polygon(points: &[(f64, f64)]) -> String {
    points
        .iter()
        .map(|(x, y)| format!("{},{}", x, y))
        .collect::<Vec<_>>()
        .join(" ")
}

pub(crate) fn read_required(
    parameters: &std::collections::HashMap<String, f64>,
    key: &str,
) -> Result<f64, String> {
    parameters
        .get(key)
        .copied()
        .ok_or_else(|| format!("Missing required parameter: {}", key))
}

pub(crate) fn validate_positive(value: f64, name: &str) -> Result<f64, String> {
    if value <= 0.0 {
        Err(format!("{} must be greater than 0", name))
    } else {
        Ok(value)
    }
}

pub(crate) fn validate_non_negative(value: f64, name: &str) -> Result<f64, String> {
    if value < 0.0 {
        Err(format!("{} must be non-negative", name))
    } else {
        Ok(value)
    }
}

pub(crate) fn stroke_style() -> &'static str {
    r#"fill="none" stroke="black" stroke-width="2""#
}

pub(crate) fn filled_style() -> &'static str {
    r#"fill="#dbeafe" stroke="black" stroke-width="2""#
}

pub(crate) fn pack(element: String, width: f64, height: f64) -> Result<ShapeSvgData, String> {
    Ok(ShapeSvgData {
        element,
        width,
        height,
    })
}