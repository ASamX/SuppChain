<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use SCM\Admin\AdminServices\Repositories\AdminRepository;
use SCM\Admin\AdminServices\Requests\CreateAdmin;
use SCM\Admin\AdminServices\Requests\CreateUserImage;
use SCM\Admin\AdminServices\Requests\editProfile;

class SuperAdminController extends Controller
{
    private AdminRepository $adminRepository;

    public function __construct(AdminRepository $adminRepository)
    {
        $this->adminRepository = $adminRepository;
    }

    public function addAdmin(CreateAdmin $request)
    {
        return $this->adminRepository->addAdmin($request);
    }


    public function addImage(CreateUserImage $request, $id)
    {
        return $this->adminRepository->addImage($request, $id);
    }


    public function editProfile(editProfile $request, $id)
    {
        return $this->adminRepository->editProfile($request, $id);
    }


    public function deleteImage($id)
    {
        return $this->adminRepository->deleteImage($id);
    }


    public function allUsers()
    {
        return $this->adminRepository->allUsers();
    }

    public function search(Request $request)
    {
        return $this->adminRepository->search($request);
    }
}
