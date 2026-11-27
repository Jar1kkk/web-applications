<?php
// Завдання 6. Інтерфейс фігури
interface Shape
{
    public function calculateArea(): float;

    public function calculatePerimeter(): float;
}

// Перевірка, спільна для всіх фігур
function requirePositive(float $value, string $name): float
{
    if ($value <= 0) {
        throw new InvalidArgumentException("$name має бути більше нуля");
    }

    return $value;
}

// Завдання 4. Прямокутник з приватними властивостями
class Rectangle implements Shape
{
    private float $width = 0;
    private float $height = 0;

    public function __construct(?float $width = null, ?float $height = null)
    {
        if ($width !== null) {
            $this->setWidth($width);
        }
        if ($height !== null) {
            $this->setHeight($height);
        }
    }

    public function getWidth(): float
    {
        return $this->width;
    }

    public function getHeight(): float
    {
        return $this->height;
    }

    public function setWidth(float $width): void
    {
        $this->width = requirePositive($width, 'Ширина');
    }

    public function setHeight(float $height): void
    {
        $this->height = requirePositive($height, 'Висота');
    }

    public function calculateArea(): float
    {
        return $this->width * $this->height;
    }

    public function calculatePerimeter(): float
    {
        return 2 * ($this->width + $this->height);
    }
}

// Завдання 5. Квадрат наслідує прямокутник
class Square extends Rectangle
{
    private float $side = 0;

    public function setSide(float $side): void
    {
        $this->side = requirePositive($side, 'Сторона');
        parent::setWidth($this->side);
        parent::setHeight($this->side);
    }

    // щоб квадрат завжди залишався квадратом
    public function setWidth(float $width): void
    {
        $this->setSide($width);
    }

    public function setHeight(float $height): void
    {
        $this->setSide($height);
    }
}

class Circle implements Shape
{
    private float $radius = 0;

    public function __construct(float $radius)
    {
        $this->setRadius($radius);
    }

    public function setRadius(float $radius): void
    {
        $this->radius = requirePositive($radius, 'Радіус');
    }

    public function calculateArea(): float
    {
        return round(M_PI * $this->radius ** 2, 2);
    }

    public function calculatePerimeter(): float
    {
        return round(2 * M_PI * $this->radius, 2);
    }
}
