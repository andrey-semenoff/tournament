<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
	protected $fillable = ['name', 'level', 'score', 'suspected'];

  //
	public function tournaments() {
		return $this->belongsToMany('\App\Tournament');
	}
}
