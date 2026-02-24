<?php

namespace App\Enum\Admin;

use JsonSerializable;
use function Laravel\Prompts\select;

enum CategoryStatus: int implements JsonSerializable
{
    case ACTIVE = 1;
    case INACTIVE = 0;

    public function label(): string
    {
        return match ($this) {
            self::ACTIVE => 'АКТИВНА',
            self::INACTIVE => 'НЕАКТИВНА',
        };
    }

    public function toArray(): array
    {
        return [
            'value' => $this->value,
            'label' => $this->label(),
        ];
    }

    public function JsonSerialize(): array
    {
        return $this->toArray();
    }

    public static function normalizeFrom(self|int|null $status): self
    {
        if ($status === null) {
            return self::ACTIVE;
        }

        if ($status instanceof self) {
            return $status;
        }

        return self::from($status);
    }

    public static function getStatuses(): array
    {
        $statuses = [];

        foreach (self::cases() as $status) {
           $statuses[] = $status->toArray();
        }

        return $statuses;
    }
}
