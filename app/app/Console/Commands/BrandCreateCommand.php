<?php

namespace App\Console\Commands;

use App\Services\Brands\BrandManagementSystem;
use App\Services\Brands\BrandManagerSystem;
use Exception;
use Illuminate\Console\Command;
use InvalidArgumentException;
use Symfony\Component\Console\Command\Command as CommandAlias;

class BrandCreateCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'brand:create {name?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a brand in the database';

    /**
     * Execute the console command.
     */
    public function handle(BrandManagementSystem $brandManagementSystem)
    {
        try {
            $name = $this->argument('name');

            if ($name === null) {
                $name = $this->ask('Enter brand name');
            }

            if (!is_string($name)) {
                throw new InvalidArgumentException('Brand name is required.');
            }

            $brandManagementSystem->createBrand($name);

            $this->newLine();
            $this->info('Brand "' . $name . '" successfully created.');

            return CommandAlias::SUCCESS;

        } catch (Exception $e) {
            $this->error('Something went wrong: ' . $e->getMessage());

            return CommandAlias::FAILURE;
        }
    }
}
