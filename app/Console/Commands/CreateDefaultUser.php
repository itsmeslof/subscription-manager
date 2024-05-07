<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CreateDefaultUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sm:create-default-user';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates the default application user.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $status = Command::SUCCESS;

        if (User::count()) {
            $this->error('A user already exists. To reset it, run `php artisan sm:reset-default-user`');
            return Command::FAILURE;
        }

        User::factory()->create([
            'name' => 'user',
            'email' => 'user@example.com',
        ]);

        $this->info('Default user created with the following credentials:');
        $this->info('email: user@example.com');
        $this->info('password: password');

        $this->warn('You should login and change these credentials immediately.');

        return $status;
    }
}
