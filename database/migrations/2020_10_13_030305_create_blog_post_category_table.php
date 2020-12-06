<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogPostCategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blog_post_category', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("id_blog");
            $table->unsignedBigInteger("id_category");
            $table->foreign('id_blog')->references('id')->on('blog');
            $table->foreign('id_category')->references('id')->on('post_category');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blog_post_category');
    }
}
