<?php

namespace app\modules\api\v1\resources;


use app\models\User;


/**
 * Class UserResource
 *
 * @package app\modules\api\v1\resources
 */

class UserResource extends User
{
    public function fields()
    {
        return [
            'numero_mecanografico', 'nome', 'sessionId','token', 'email', 'api_key'
        ];
    }
}