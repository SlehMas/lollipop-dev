<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateTableInscriptions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('inscriptions', function (Blueprint $table) {
          $table->string('domaine')->nullable()->change();
          $table->string('niveau')->nullable()->change();
          $table->string('motivation')->nullable();
          $table->string('experience')->nullable()->change();
          $table->string('profession');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
