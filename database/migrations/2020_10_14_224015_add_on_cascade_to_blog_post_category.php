<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOnCascadeToBlogPostCategory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('blog_post_category', function (Blueprint $table) {
            //
            $table->dropForeign('id_blog');
            $table->foreign('id_blog')
              ->references('id')->constrained()->on('blog')
              ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('blog_post_category', function (Blueprint $table) {
            //
        });
    }
}
