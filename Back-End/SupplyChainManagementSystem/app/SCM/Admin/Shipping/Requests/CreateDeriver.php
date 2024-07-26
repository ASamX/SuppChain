<?php

namespace SCM\Admin\Shipping\Requests;

use SCM\Base\Requests\ApiRequest;

class CreateDeriver extends ApiRequest
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
            'deriver_name' => 'required',
            'car_number'   => 'required|unique:suppliers,car_number',
            'phone'        => 'required|unique:suppliers,phone|numeric',
            'image'        => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:8048',
        ];
    }
}
