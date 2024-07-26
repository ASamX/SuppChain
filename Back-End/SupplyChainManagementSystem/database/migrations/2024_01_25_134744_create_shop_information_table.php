<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shop_information', function (Blueprint $table) {
            $table->id();
            $table->string('shop_name');
            $table->unsignedBigInteger('shopAdmin_id')->nullable();
            $table->foreign('shopAdmin_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('address')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shop_information');
    }
};
