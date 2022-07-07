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
class RegisterForm extends Model
{
    public $username;
    public $password;


    public $user = null;


    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            [['numero_mecanografico', 'password'], 'required'],
            ['numero_mecanografico', 'compare', 'compareAttribute' => 'password_repeat'],
            ['numero_mecanografico', 'unique',
                'targetClass' => '\app\modules\api\resources\UserResource',
                'message' => 'This username has already been taken.'
            ],
        ];
    }

    public function register($username, $password, $sessionId, $email, $nome)
    {
        if ($this->validate()) {
            $user = new UserResource();
            $user->numero_mecanografico = $username;
            $user->password_hash = Yii::$app->security->generatePasswordHash($password);
            $user->numero_mecanografico = $sessionId;
            $user->email= $email;
            $user->nome= $nome;
            $this->user = $user;
            if ($user->save()) {
                return Yii::$app->user->login($user, 0);
            }
            return false;
        }
        return false;
    }

}