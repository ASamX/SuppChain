<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use SCM\User\Repositories\CommentRepository;
use SCM\User\Requests\CreateComment;

class CommentController extends Controller
{
    private CommentRepository $commentRepository;

    public function __construct(CommentRepository $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }

    public function index($product_id)
    {
        return $this->commentRepository->index($product_id);
    }

    public function store(CreateComment $request, $product_id)
    {
        return $this->commentRepository->store($request, $product_id);
    }

    public function update(CreateComment $request, $id, $product_id)
    {
        return $this->commentRepository->update($request, $id, $product_id);
    }


    public function destroy($id)
    {
        return $this->commentRepository->destroy($id);
    }
}
