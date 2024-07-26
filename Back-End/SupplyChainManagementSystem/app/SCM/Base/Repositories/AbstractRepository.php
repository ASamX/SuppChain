<?php

namespace SCM\Base\Repositories;

use Illuminate\Database\Eloquent\Model;

class AbstractRepository implements RepositoryInterface
{
    protected Model $model;

    public function all()
    {
        return $this->model->all();
    }

    public function find($id)
    {
        return $this->model->findOrFail($id);
    }

    public function create(array $data)
    {
        foreach ($data as $filed => $val) {
            $this->model->{$filed} = $val;
        }
        $this->model->save();
        return $this->model;
    }

    public function edit(array $data, $id)
    {
        $model = $this->model->findOrFail($id);

        foreach ($data as $filed => $val) {
            $model->{$filed} = $val;
        }
        $model->save();
        return $model;
    }

    public function delete($id)
    {
        $this->model = $this->model->findOrFail($id);

        $this->model->delete();

        return response()->json(['status' => 'deleted'], 200);
    }


    // public function search($request)
    // {
    //     $search = $request->input('search');
    //     if ($search) {
    //         $result = $this->model->where('name', 'like', "%{$search}%")->get();
    //     } else {
    //         $result = $this->model->all();
    //     }

    //     return response()->json($result);
    // }


    public function getModel()
    {
        return $this->model;
    }

    public function setModel(Model $model)
    {
        $this->model = $model;
    }
}
