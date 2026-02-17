<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BrandsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            'Рошен',
            'Сільпо Власний Рахунок',
            'Наша Ряба',
            'Галичина',
            'Яготинське',
            'Молокія',
            'Агропродукт',
            'Торчин',
            'Верес',
            'Чумак',
            'Оболонь',
            'Світоч',
            'Житомирські ласощі',
            'Київхліб',
            'Львівська майстерня шоколаду',
        ];

        foreach ($brands as $brandName) {
            Brand::firstOrCreate(
                ['name' => $brandName],
                ['slug' => Str::slug($brandName)]);
        }
    }
}
