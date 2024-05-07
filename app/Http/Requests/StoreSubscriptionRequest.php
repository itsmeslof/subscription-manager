<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSubscriptionRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'cost' => ['required', 'numeric'],
            'cycle' => ['required', 'string', Rule::in(['monthly', 'semi-yearly', 'yearly'])],
            'active' => ['required', 'boolean'],
            'renewal_note' => ['nullable', 'string'],
        ];
    }
    
    protected function prepareForValidation()
    {
        $this->merge([
            'cost' => str_replace(',', '', $this->cost),
        ]);
    }
}
