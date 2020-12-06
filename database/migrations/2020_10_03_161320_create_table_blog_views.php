<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableBlogViews extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blog_views', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("id_blog");
            $table->string("url");
            $table->string("session_id");
            $table->string("ip");
            $table->string("agent");
            $table->timestamps();

            $table->foreign('id_blog')->references('id')->on('blog');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blog_views');
    }
}
