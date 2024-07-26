<?php

namespace SCM\Admin\Suppliers\Requests;

use SCM\Base\Requests\ApiRequest;

class CreateSupplier extends ApiRequest
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
            'supplier_name'  => 'required',
            'supplier_email' => 'required|email|unique:suppliers,supplier_email',
            'raw_materials'  => 'required',
            'phone'          => 'required|unique:suppliers,phone|numeric',
            'image'          => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:8048',
        ];
    }
}
