<?php

namespace SCM\Admin\Shops\Repositories;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use SCM\Admin\Shops\Models\ShopInformation;
use SCM\Base\Repositories\AbstractRepository;
use Illuminate\Support\Facades\Storage;


class ShopInformationRepository extends AbstractRepository
{

    public function __construct(ShopInformation $shopInformation)
    {
        $this->setModel($shopInformation);
    }

    public function store(Request $request)
    {
        $shop_info = new ShopInformation();
        $user = User::findOrFail($request->get('shopAdmin_id'));
        $shop_info->shop_name = $request->get('shop_name');
        $shop_info->address = $request->get('address');
        if ($user->role == 3) {
            $shop_info->shopAdmin_id = $request->get('shopAdmin_id');
        } else {
            return response()->json(['status' => 'Shop Admin ID must be ID Shop Admin'], JsonResponse::HTTP_NOT_FOUND);
        }
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('shop_info', 'public');
            $shop_info->image = $imagePath;
        }

        $shop_info->save();
        return $shop_info;
    }


    public function update(Request $request, $id)
    {
        $shop_info = ShopInformation::findOrFail($id);
        $user = User::findOrFail($request->get('shopAdmin_id'));
        $shop_info->shop_name = $request->get('shop_name');
        $shop_info->address = $request->get('address');
        if ($user->role == 3) {
            $shop_info->shopAdmin_id = $request->get('shopAdmin_id');
        } else {
            return response()->json(['status' => 'Shop Admin ID must be ID Shop Admin'], JsonResponse::HTTP_NOT_FOUND);
        }
        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($shop_info->image);
            $image = $request->file('image');
            $imagePath = $image->store('shop_info', 'public');
            $shop_info->image = $imagePath;
        }

        $shop_info->save();
        return $shop_info;
    }

    public function destroy(int $id)
    {
        $shop_info = ShopInformation::findOrFail($id);

        if (!empty($shop_info->image)) {
            Storage::disk('public')->delete($shop_info->image);
        }

        $shop_info->delete();

        return response()->json(['status' => 'deleted'], 200);
    }

    public function showShopInfoForSpecificAdmin()
    {
        $shodAdminId = auth()->user()->id;
        return ShopInformation::where('shopAdmin_id', $shodAdminId)->get();
    }

    public function search(Request $request)
    {
        $search = $request->input('search');
        if ($search) {
            $shop_info = ShopInformation::where('shop_name', 'like', "%{$search}%")->get();
        } else {
            $shop_info = ShopInformation::all();
        }

        return response()->json($shop_info);
    }
}
