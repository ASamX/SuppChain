<?php

namespace SCM\User\Requests;

use SCM\Base\Requests\ApiRequest;

class CreateOrder extends ApiRequest
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
            'name' => 'required|min:3|max:255',
            'email' => 'required|email',
            'phone' => 'required|min:8|max:18',
            'address' => 'nullable|min:3|max:255',
            'city' => 'nullable|min:3|max:255',
            'state' => 'nullable|min:3|max:255',
            'zipCode' => 'nullable|min:3|max:255',
            'country' => 'nullable|min:3|max:255',
            'shipping_method' => 'required|min:3|max:255',
            'shipping_amount' => 'nullable|numeric',
            'tax_amount' => 'nullable|numeric',
            'payment_method' => 'required|min:3|max:255',
            'notes' => 'nullable|min:3|max:255',
        ];
    }
}
