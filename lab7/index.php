<?php
require __DIR__ . '/functions.php';
require __DIR__ . '/shapes.php';

// Виконує приклад із завдання та повертає все, що він надрукував
function capture(callable $example): string
{
    ob_start();
    $example();

    return htmlspecialchars(ob_get_clean());
}

$tasks = [
    '1. findMaxMin' => function () {
        $numbers = [3, 5, 1, 8, -2];
        $result = findMaxMin($numbers);
        print_r($result);
    },
    '2. extractEmails' => function () {
        $text = "Контакти: admin@example.com, support@website.org";
        $emails = extractEmails($text);
        print_r($emails);
    },
    '3. sumNestedArray' => function () {
        $array = [1, [2, 3], [4, [5, 6]]];
        echo sumNestedArray($array);
    },
    '4. Клас Rectangle' => function () {
        $rectangle = new Rectangle();
        $rectangle->setWidth(5);
        $rectangle->setHeight(10);
        echo $rectangle->calculateArea(), "\n";
        try {
            $rectangle->setWidth(0);
        } catch (InvalidArgumentException $e) {
            echo "Помилка: ", $e->getMessage();
        }
    },
    '5. Клас Square' => function () {
        $square = new Square();
        $square->setSide(4);
        echo $square->calculatePerimeter();
    },
    '6. Інтерфейс Shape' => function () {
        $shapes = [new Circle(3), new Rectangle(4, 5)];
        foreach ($shapes as $shape) {
            echo "Area: " . $shape->calculateArea() . "\n";
            echo "Perimeter: " . $shape->calculatePerimeter() . "\n";
        }
    },
];
?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>Лабораторна робота 7</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 760px; margin: 0 auto; padding: 16px; background: #f1f5f9; }
        h1 { font-size: 22px; margin: 4px 0 12px; }
        h2 { font-size: 16px; margin: 0 0 8px; }
        section { background: #fff; border-radius: 8px; padding: 12px 16px; margin-bottom: 10px; }
        pre { margin: 0; font-size: 14px; }
    </style>
</head>
<body>
    <h1>Лабораторна робота №7. Функції та об’єкти в PHP</h1>
    <?php foreach ($tasks as $title => $example): ?>
        <section>
            <h2><?= htmlspecialchars($title) ?></h2>
            <pre><?= capture($example) ?></pre>
        </section>
    <?php endforeach; ?>
</body>
</html>
