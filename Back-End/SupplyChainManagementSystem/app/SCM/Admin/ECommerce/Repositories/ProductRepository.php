<?php

namespace SCM\Admin\ECommerce\Repositories;

use Illuminate\Http\Request;
use SCM\Admin\ECommerce\Models\Category;
use SCM\Admin\ECommerce\Models\ProductImage;
use SCM\Base\Repositories\AbstractRepository;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\JsonResponse;
use SCM\Admin\ECommerce\Models\Product;

class ProductRepository extends AbstractRepository
{
    public function __construct(Product $product)
    {
        $this->setModel($product);
    }

    public function all()
    {
        return Product::with('color', 'size', 'image')->get();
    }


    public function index($childCategory_id)
    {
        return Product::with('color', 'size', 'image')->where('category_id', $childCategory_id)->get();
    }


    public function store(Request $request, $childCategory_id)
    {

        $product = new Product();
        $category = Category::findOrFail($childCategory_id);

        if ($category->parent_id == null) {
            return response()->json(['status' => 'Can Not Add Product In Main Category'], JsonResponse::HTTP_BAD_REQUEST);
        }
        $product->name = $request->get('name');
        $product->description = $request->get('description');
        $product->price = $request->get('price');
        $product->quantity = $request->get('quantity');
        $product->discount_price = $request->get('discount_price');
        $product->active = $request->get('active');
        $product->raw_material_name = $request->get('raw_material_name');
        $product->raw_material_quantity_kg = $request->get('raw_material_quantity_kg');
        $product->category_id = $childCategory_id;

        $product->save();
        return $product;
    }

    public function show($id)
    {
        return Product::with('color', 'size', 'image')->where('id', $id)->get();
    }

    public function destroy(int $id)
    {
        $product = Product::findOrFail($id);

        $productImage = ProductImage::where('product_id', $id)->first();


        if (!empty($productImage->image)) {
            Storage::disk('public')->deleteDirectory('productImages/' . $productImage->product_id);
        }

        $product->delete();

        return response()->json(['status' => 'deleted'], 200);
    }

    public function search(Request $request)
    {
        $search = $request->input('search');
        if ($search) {
            $products = Product::where('name', 'like', "%{$search}%")->with('color', 'size', 'image')->get();
        } else {
            $products = Product::with('color', 'size', 'image')->get();
        }

        return response()->json($products);
    }
}
