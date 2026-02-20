<?php

namespace App\Enum\Admin;

enum CategoryStatus: int
{
    case ACTIVE = 1;
    case INACTIVE = 0;

    public function label(): string
    {
        return match($this) {
            self::ACTIVE => 'АКТИВНА',
            self::INACTIVE => 'НЕАКТИВНА',
        };
    }
}
