<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableDatesformation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('datesformations', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->unsignedBigInteger('id_formation');
            $table->timestamps();

            $table->foreign('id_formation')->references('id')->on('formation')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('datesformation');
    }
}
