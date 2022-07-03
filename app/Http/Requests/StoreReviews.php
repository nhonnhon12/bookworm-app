<?php

namespace App\Http\Requests;

use App\Models\Book;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreReviews extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $bookIdArray = Book::select('id')->get()->pluck('id');
        return [
            'book_id' => ['required','integer', Rule::in($bookIdArray)], //book_id must be saved in book table
            'title' => 'required|string',
            'details' => 'string',
            'star' => 'required|integer|digits_between:1,5'
        ];
    }
}
