<?php

namespace SCM\Base\Repositories;

use Illuminate\Http\Request;

interface RepositoryInterface
{
    public function all();
    public function find($id);
    public function create(array $data);
    public function edit(array $data, $id);
    // public function search(Request $request);
    public function delete($id);
}
