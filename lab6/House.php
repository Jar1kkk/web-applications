<?php
// Завдання 6. Клас будинку з усіма атрибутами картки
class House
{
    public function __construct(
        public string $title,
        public int $price,
        public string $address,
        public string $phone,
        public string $image,
        public int $bedrooms,
        public int $bathrooms,
        public string $realtor
    ) {
    }
}
