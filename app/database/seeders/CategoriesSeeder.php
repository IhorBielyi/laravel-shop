<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $parents = [
            'Овочі та фрукти',
            'Мʼясо та птиця',
            'Риба та морепродукти',
            'Молочні продукти',
            'Хліб та випічка',
            'Бакалія',
            'Заморожені продукти',
            'Напої',
            'Солодощі',
            'Соуси та спеції',
        ];

        foreach ($parents as $parent) {
            Category::firstOrCreate(
                ['name' => $parent],
                ['slug' => Str::slug($parent)]);
        }

        $children = [
            [
                'name' => 'Яблука',
                'parent_id' => '1',
            ],
            [
                'name' => 'Куряче філе',
                'parent_id' => '2',
            ],
            [
                'name' => 'Молоко',
                'parent_id' => '4',
            ],
            [
                'name' => 'Шоколад',
                'parent_id' => '9',
            ],
            [
                'name' => 'Мінеральна вода',
                'parent_id' => '8',
            ],
        ];

        foreach ($children as $child) {
            Category::firstOrCreate(
                ['name' => $child['name']],
                [
                    'slug' => Str::slug($child['name']),
                    'parent_id' => (int) $child['parent_id'],
                ]
            );
        }
    }
}
