use std::ops::{Add, Mul};

#[derive(Debug, Clone, Copy)]
pub struct Complex {
    pub real: f64,
    pub imag: f64,
}

impl Complex {
    pub fn mag(&self) -> f64 {
        self.real * self.real + self.imag * self.imag
    }

    pub fn square(&self) -> Self {
        Self {
            real: self.real * self.real - self.imag * self.imag,
            imag: 2.0 * self.real * self.imag,
        }
    }

    #[inline]
    pub fn ln(&self) -> Self {
        Self {
            real: self.mag().sqrt().ln(),
            imag: self.imag.atan2(self.real),
        }
    }

    #[inline]
    pub fn exp(&self) -> Self {
        let (sin_y, cos_y) = self.imag.sin_cos();
        let exp_x = self.real.exp();

        Self {
            real: exp_x * cos_y,
            imag: exp_x * sin_y,
        }
    }
    #[inline]
    pub fn pow(&self, n: f64) -> Self {
        (self.ln() * n).exp()
    }

    pub fn pow_fast(&self, n: f64) -> Self {
        let (sin_y, cos_y) = (n * self.imag.atan2(self.real)).sin_cos();
        let exp_x = (n * self.mag().sqrt().ln()).exp();

        Self {
            real: exp_x * cos_y,
            imag: exp_x * sin_y,
        }
    }
}

impl Add for Complex {
    type Output = Self;
    fn add(self, rhs: Self) -> Self::Output {
        Self::Output {
            real: self.real + rhs.real,
            imag: self.imag + rhs.imag,
        }
    }
}

impl Mul<f64> for Complex {
    type Output = Self;
    fn mul(self, rhs: f64) -> Self::Output {
        Self::Output {
            real: rhs * self.real,
            imag: rhs * self.imag,
        }
    }
}
