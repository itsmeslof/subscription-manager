<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class ResetDefaultUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sm:reset-default-user';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Resets the default user credentials.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $status = Command::SUCCESS;

        if (!User::count()) {
            $this->error('No user exists. To create it, run `php artisan sm:create-default-user`');
            return Command::FAILURE;
        }

        $user = User::first();
        $user->name = 'user';
        $user->email = 'user@example.com';
        $user->password = Hash::make('password');
        $user->save();

        $this->info('Default user credentials reset to the following:');
        $this->info('email: user@example.com');
        $this->info('password: password');

        $this->warn('You should login and change these credentials immediately.');

        return $status;
    }
}
