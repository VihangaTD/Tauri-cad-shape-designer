use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ShapeConfig {
    #[serde(rename = "type")]
    pub shape_type: ShapeType,

    pub parameters: HashMap<String, f64>,

    pub rotation: u8,

    #[serde(rename = "flipX")]
    pub flip_x: bool,

    #[serde(rename = "flipY")]
    pub flip_y: bool,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "lowercase")]
pub enum ShapeType {
    Rectangle,
    Circle,
    Triangle,
    Lshape,
    Trapezoid,
}

#[derive(Debug, Clone)]
pub struct ShapeSvgData {
    pub element: String,
    pub width: f64,
    pub height: f64,
}