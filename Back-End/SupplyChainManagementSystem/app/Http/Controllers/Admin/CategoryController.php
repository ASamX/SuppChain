<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use SCM\Admin\ECommerce\Repositories\CategoryRepository;
use SCM\Admin\ECommerce\Requests\CreateCategory;

class CategoryController extends Controller
{

    private CategoryRepository $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function viewMainCategory()
    {
        return $this->categoryRepository->viewMainCategory();
    }

    public function createMainCategory(CreateCategory $request)
    {
        return $this->categoryRepository->createMainCategory($request);
    }

    public function viewChildCategory($category_id)
    {
        return $this->categoryRepository->viewChildCategory($category_id);
    }

    public function createChildCategory(CreateCategory $request, $category_id)
    {
        return $this->categoryRepository->createChildCategory($request, $category_id);
    }


    public function show($id)
    {
        return $this->categoryRepository->show($id);
    }


    public function update(Request $request, $id)
    {
        return $this->categoryRepository->update($request, $id);
    }


    public function destroy($id)
    {
        return $this->categoryRepository->destroy((int)$id);
    }

    public function search(Request $request)
    {
        return $this->categoryRepository->search($request);
    }
}
