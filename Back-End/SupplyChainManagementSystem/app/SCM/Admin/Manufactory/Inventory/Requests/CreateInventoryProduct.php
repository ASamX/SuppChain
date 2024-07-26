<?php

namespace SCM\Admin\Manufactory\Inventory\Requests;

use SCM\Base\Requests\ApiRequest;

class CreateInventoryProduct extends ApiRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'  => 'required',
            'Quantity' => 'required',
        ];
    }
}
