<?php

namespace App\Http\Controllers\Admin\Shops;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use SCM\Admin\Shops\Repositories\ShopInformationRepository;
use SCM\Admin\Shops\Requests\CreateShopInfo;

class ShopInformationController extends Controller
{
    private ShopInformationRepository $shopInformationRepository;

    public function __construct(ShopInformationRepository $shopInformationRepository)
    {
        $this->shopInformationRepository = $shopInformationRepository;
    }


    public function index()
    {
        return $this->shopInformationRepository->all();
    }


    // public function shopCategory($shop_id)
    // {
    //     return $this->shopInformationRepository->shopCategory($shop_id);
    // }


    public function store(CreateShopInfo $request)
    {
        return $this->shopInformationRepository->store($request);
    }


    public function show($id)
    {
        return $this->shopInformationRepository->find($id);
    }

    public function showShopInfoForSpecificAdmin()
    {
        return $this->shopInformationRepository->showShopInfoForSpecificAdmin();
    }

    public function update(CreateShopInfo $request, $id)
    {
        return $this->shopInformationRepository->update($request, $id);
    }


    public function destroy(int $id)
    {
        return $this->shopInformationRepository->destroy($id);
    }

    public function search(Request $request)
    {
        return $this->shopInformationRepository->search($request);
    }
}
