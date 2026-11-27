<?php
// Завдання 1. Найбільше та найменше значення масиву
function findMaxMin(array $numbers): array
{
    if ($numbers === []) {
        throw new InvalidArgumentException('Масив порожній');
    }

    return ['max' => max($numbers), 'min' => min($numbers)];
}

// Завдання 2. Усі email-адреси з рядка
function extractEmails(string $text): array
{
    preg_match_all('/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/', $text, $matches);

    return $matches[0];
}

// Завдання 3. Рекурсивна сума багатовимірного масиву
function sumNestedArray(array $array): int|float
{
    $sum = 0;
    foreach ($array as $item) {
        if (is_array($item)) {
            $sum += sumNestedArray($item);
        } elseif (is_int($item) || is_float($item)) {
            $sum += $item;
        }
    }

    return $sum;
}
