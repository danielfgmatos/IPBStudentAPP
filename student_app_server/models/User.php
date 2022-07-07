<?php

namespace app\models;

use yii\db\ActiveRecord;

/**
 * Class User
 * @property string $numero_mecanografico
 * @property string $password_hash
 * @property string $sessionId
 * @property string $token
 * @property string $nome
 * @property string $email
 * @property string $api_key
 */

class User extends ActiveRecord implements \yii\web\IdentityInterface
{

public static function tableName()
{
   return 'aluno';
}
    /**
     * {@inheritdoc}
     */
    public static function findIdentity($id)
    {
        return self::findOne($id);
    }
    /**
     * {@inheritdoc}
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
       return self::find()->andWhere(['token' => $token])->one();
    }
    /**
     * Finds user by username
     *
     * @param string $username
     * @return ActiveRecord|array|null
     */
    public static function findByUsername($username)
    {
        return self::find()->andWhere(['numero_mecanografico' => $username])->one();
    }
    /**
     * {@inheritdoc}
     */

    public function getApiKey()
    {
        return $this->api_key;
    }

    public function getId()
    {
        return $this->numero_mecanografico;
    }

    /**
     * {@inheritdoc}
     */
    public function getAuthKey()
    {
        return null;
    }

    /**
     * {@inheritdoc}
     */
    public function validateAuthKey($authKey)
    {
        return false;
    }

    /**
     * Validates password
     *
     * @param string $password password to validate
     * @return bool if password provided is valid for current user
     */
    public function validatePassword($password)
    {
        return \Yii::$app->security->validatePassword($password,$this->password_hash);
    }
}
