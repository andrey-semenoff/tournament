<?php

namespace App\Http\Controllers;

use App\Player;
use App\Tournament;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Input;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $get = Input::all();
        $query = Player::orderBy('created_at', 'desc');

        if( !empty($get['search']) ) {
            if( empty($get['level']) ) {
                $query->orWhere('level', 'like', '%'. $get['search'] .'%');
            }

            $query->orWhere('id', 'like', '%'. $get['search'] .'%')
                  ->orWhere('name', 'like', '%'. $get['search'] .'%')
                  ->orWhere('score', 'like', '%'. $get['search'] .'%');
        }

        if( !empty($get['level']) ) {
            $query->having('level', $get['level']);
        }

        $total = $query->get()->count();
        $response_data = $query->skip($get['start'])->take($get['n'])->get();

        return response($response_data, 200)
                 ->header('x-total', $total);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        if( !isset($request->suspected) ) {
            $request->suspected = 0;
        }

        $request->validate([
            'name' => 'required|max:255',
            'level' => 'required|max:255',
            'score' => 'required|max:150',
        ]);

        $player = Player::create([
            'name'      => $request->name,
            'level'     => $request->level,
            'score'     => $request->score,
            'suspected' => $request->suspected
        ]);

        Tournament::find(1)->players()->save($player);

        return $this->index();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Player  $player
     * @return \Illuminate\Http\Response
     */
    public function show(Player $player)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Player  $player
     * @return \Illuminate\Http\Response
     */
    public function edit(Player $player)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Player  $player
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Player $player)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Player  $player
     * @return \Illuminate\Http\Response
     */
    public function destroy(Player $player)
    {
        //
    }
}
