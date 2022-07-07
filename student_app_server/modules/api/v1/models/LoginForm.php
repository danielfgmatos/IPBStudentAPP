<?php

namespace app\modules\api\v1\models;


use app\models\User;
use app\modules\api\v1\resources\UserResource;
use Yii;
use yii\base\Model;

/**
 * LoginForm is the model behind the login form.
 *
 * @property User|null $user This property is read-only.
 *
 */
class LoginForm extends \app\models\LoginForm
{
    /**
     * @return \app\models\User|UserResource|bool|null
     */
    public function getUser()
    {
        if ($this->_user=== false) {
            $this->_user = UserResource::findByUsername($this->numero_mecanografico);
        }

        return $this->_user;
    }
}