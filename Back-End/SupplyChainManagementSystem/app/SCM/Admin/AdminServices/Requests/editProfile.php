<?php

namespace SCM\Admin\AdminServices\Requests;

use SCM\Base\Requests\UserApiRequest;


class editProfile extends UserApiRequest
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
            'name'     => 'nullable|string|between:2,100',
            'password' => 'nullable|string|min:6',
            'image'    => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:8048',
        ];
    }
}