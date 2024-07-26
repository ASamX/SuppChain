<?php

namespace SCM\Admin\ECommerce\Repositories;

use SCM\Admin\ECommerce\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryRepository
{
    public function viewMainCategory()
    {
        return Category::where('parent_id', null)->get();
    }

    public function createMainCategory(Request $request)
    {
        $category = new Category();
        $category->name = $request->get('name');
        $category->description = $request->get('description');

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('CategoryImages', 'public');
            $category->image = $imagePath;
        }

        $category->save();
        return $category;
    }

    public function viewChildCategory($category_id)
    {
        return Category::where('parent_id', $category_id)->get();
    }


    public function createChildCategory(Request $request, $category_id)
    {
        $category = new Category();
        $category->name = $request->get('name');
        $category->description = $request->get('description');

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('CategoryImages', 'public');
            $category->image = $imagePath;
        }

        if ($request->id === $category_id) {
            $category->parent_id = $category_id;
        }

        $category->save();
        return $category;
    }


    public function show($id)
    {
        return Category::findOrFail($id);
    }


    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $category->name = $request->get('name');
        $category->description = $request->get('description');


        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($category->image);
            $image = $request->file('image');
            $imagePath = $image->store('CategoryImages', 'public');
            $category->image = $imagePath;
        }

        $category->save();
        return $category;
    }


    public function destroy(int $id)
    {
        $category = Category::findOrFail($id);
        
        if (!empty($category->image)) {
            Storage::disk('public')->delete($category->image);
        }
        
        $category->delete();

        return response()->json(['status' => 'deleted'], 200);
    }

    public function search(Request $request)
    {
        $search = $request->input('search');
        if ($search) {
            $categories = Category::where('name', 'like', "%{$search}%")->get();
        } else {
            $categories = Category::all();
        }

        return response()->json($categories);
    }
}
