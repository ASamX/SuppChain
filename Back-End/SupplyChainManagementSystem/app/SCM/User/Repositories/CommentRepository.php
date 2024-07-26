<?php

namespace SCM\User\Repositories;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use SCM\User\Models\Comment;

class CommentRepository
{
    public function index($product_id)
    {
        return Comment::where('product_id', $product_id)->with('user')->get();
    }


    public function store(Request $request, $product_id)
    {
        $comment = new Comment();

        $comment->content = $request->get('content');
        $comment->user_id = Auth::user()->id;
        $comment->product_id = $product_id;

        $comment->save();

        return $comment;
    }


    public function update(Request $request, $id, $product_id)
    {
        $Comment = Comment::findOrFail($id);

        $Comment->content = $request->get('content');
        $Comment->user_id = Auth::user()->id;
        $Comment->product_id = $product_id;

        $Comment->save();

        return $Comment;
    }


    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);

        $comment->delete();

        return response()->json(['status' => 'deleted'], 200);
    }
}
