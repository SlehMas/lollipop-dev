<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableInscriptions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inscriptions', function (Blueprint $table) {
            $table->id();
            $table->string('prenom');
            $table->string('nom');
            $table->string('email');
            $table->string('domaine');
            $table->string('niveau');
            $table->string('experience');
            $table->string('adresse');
            $table->string('telephone');
            $table->integer('age');
            $table->text('idee_projet')->nullable();
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
        Schema::dropIfExists('inscriptions');
    }
}
