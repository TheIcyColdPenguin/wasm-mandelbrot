use wasm_bindgen::{
    prelude::{wasm_bindgen, JsValue},
    Clamped,
};

use web_sys::{CanvasRenderingContext2d, ImageData};

use crate::{
    complex::Complex,
    util::{map, COLORS},
};

#[wasm_bindgen]
pub struct AppState {
    scale: u32,
    pow: f64,
    fast: bool,
    need_update: bool,
    canvas_width: u32,
    canvas_height: u32,
    space_width: (f64, f64),
    space_height: (f64, f64),
}

#[wasm_bindgen]
extern "C" {
    pub fn alert(st: &str);
}

#[wasm_bindgen]
impl AppState {
    pub fn new(canvas_width: u32, canvas_height: u32) -> Self {
        let space_width = (-1.5, 1.0);

        let pixels_per_unit = canvas_width as f64 / (space_width.1 - space_width.0);
        let height_units_halfway = canvas_height as f64 / pixels_per_unit;

        let space_height = (-height_units_halfway, height_units_halfway);

        Self {
            scale: 4,
            pow: 3.0,
            fast: false,
            need_update: true,
            canvas_width,
            canvas_height,
            space_width,
            space_height,
        }
    }

    pub fn set_scale(&mut self, n: u32) {
        self.scale = 10 - n;
        self.need_update = true;
    }

    pub fn inc_pow(&mut self, del_pow: f64) {
        self.pow += del_pow;
        self.need_update = true;
    }

    pub fn toggle_fast(&mut self) {
        self.fast = !self.fast;
        self.need_update = true;
    }

    fn solver(&self, x: f64, y: f64) -> u32 {
        let max_iters = 900;
        let real = map(
            x,
            0.0,
            self.canvas_width as f64,
            self.space_width.0,
            self.space_width.1,
        );
        let imag = map(
            y,
            0.0,
            self.canvas_height as f64,
            self.space_height.0,
            self.space_height.1,
        );

        let c = Complex { real, imag };
        let mut z = Complex {
            real: 0.0,
            imag: 0.0,
        };
        let mut iters = 0;
        if self.fast {
            while iters < max_iters {
                z = z.square() + c;
                iters += 1;
                if z.mag() > 2.0 {
                    break;
                }
            }
        } else {
            while iters < max_iters {
                z = z.pow_fast(self.pow) + c;
                iters += 1;
                if z.mag() > 2.0 {
                    break;
                }
            }
        }

        iters
    }

    fn generate_image_data(&self) -> Vec<u8> {
        let mut pixels = vec![0; self.canvas_width as usize * self.canvas_height as usize * 4];

        for y in (0..(self.canvas_height - self.scale)).step_by(self.scale as usize) {
            for x in (0..(self.canvas_width - self.scale)).step_by(self.scale as usize) {
                let val = self.solver(x as f64, y as f64);
                let col = COLORS[val as usize % COLORS.len()];

                for dx in 0..self.scale {
                    for dy in 0..self.scale {
                        let index = (4 * (x + dx + (y + dy) * self.canvas_width)) as usize;

                        pixels[index + 0] = col.0;
                        pixels[index + 1] = col.1;
                        pixels[index + 2] = col.2;
                        pixels[index + 3] = 255;
                    }
                }
            }
        }

        pixels
    }

    pub fn draw(&mut self, ctx: &CanvasRenderingContext2d) -> Result<(), JsValue> {
        if !self.need_update {
            return Ok(());
        }

        let image_data = self.generate_image_data();
        let image = ImageData::new_with_u8_clamped_array_and_sh(
            Clamped(&image_data),
            self.canvas_width,
            self.canvas_height,
        )?;

        ctx.put_image_data(&image, 0.0, 0.0)?;

        self.need_update = false;

        Ok(())
    }

    pub fn zoom(&mut self, scroll: f64) {
        let diff = if scroll.is_sign_positive() { -1.0 } else { 1.0 }
            * (self.space_width.0 - self.space_width.1).abs()
            / 20.0;

        self.space_width.0 += diff;
        self.space_width.1 -= diff;

        let y_mean = (self.space_height.0 + self.space_height.1) / 2.0;

        let pixels_per_unit = self.canvas_width as f64 / (self.space_width.1 - self.space_width.0);
        let height_units_halfway = self.canvas_height as f64 / pixels_per_unit;

        self.space_height = (y_mean - height_units_halfway, y_mean + height_units_halfway);

        self.need_update = true;
    }

    pub fn pan(&mut self, old_x: f64, old_y: f64, new_x: f64, new_y: f64) {
        let delta_x = map(
            new_x,
            0.0,
            self.canvas_width as f64,
            self.space_width.0,
            self.space_width.1,
        ) - map(
            old_x,
            0.0,
            self.canvas_width as f64,
            self.space_width.0,
            self.space_width.1,
        );
        let delta_y = map(
            new_y,
            0.0,
            self.canvas_height as f64,
            self.space_height.0,
            self.space_height.1,
        ) - map(
            old_y,
            0.0,
            self.canvas_height as f64,
            self.space_height.0,
            self.space_height.1,
        );

        self.space_width.0 -= delta_x;
        self.space_width.1 -= delta_x;
        self.space_height.0 -= delta_y;
        self.space_height.1 -= delta_y;

        self.need_update = true;
    }
}
