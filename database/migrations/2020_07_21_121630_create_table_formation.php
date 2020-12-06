<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableFormation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('formations', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('lieu');
            $table->integer('places');
            $table->date('date_debut');
            $table->date('date_fin');
            $table->unsignedBigInteger('id_categorie');
            $table->unsignedBigInteger('id_niveau');
            $table->timestamps();
            $table->foreign('id_categorie')->references('id')->on('categorie');
            $table->foreign('id_niveau')->references('id')->on('niveau');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('formation');
    }
}
