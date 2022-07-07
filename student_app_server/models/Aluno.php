<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "aluno".
 *
 * @property string $numero_mecanografico
 * @property string $password_hash
 * @property string $sessionId
 * @property string $token
 * @property string $nome
 * @property string $email
 * @property string $api_key
 *
 * @property Disciplina[] $codigoDisciplinas
 * @property Inscricao[] $inscricaos
 */
class Aluno extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'aluno';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['numero_mecanografico', 'password_hash', 'sessionId', 'nome', 'email','token', 'api_key'], 'required'],
            [['numero_mecanografico'], 'string', 'max' => 30],
            [['password_hash', 'nome'], 'string', 'max' => 512],
            [['sessonId', 'token'], 'string', 'max' => 1024],
            [['email'], 'string', 'max' => 45],
            [['api_key', 'string', 'max' => 100]],
            [['numero_mecanografico'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'numero_mecanografico' => 'Numero Mecanografico',
            'password_hash' => 'Password Hash',
            'sessionId' => 'Sesson ID',
            'nome' => 'Nome',
            'email' => 'Email',
            'api_key' => 'API KEY',
            'token' =>'Token',
        ];
    }

    /**
     * Gets query for [[CodigoDisciplinas]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCodigoDisciplinas()
    {
        return $this->hasMany(Disciplina::className(), ['codigo_disciplina' => 'codigo_disciplina'])->viaTable('inscricao', ['numero_mecanografico_fk' => 'numero_mecanografico']);
    }

    /**
     * Gets query for [[Inscricaos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getInscricaos()
    {
        return $this->hasMany(Inscricao::className(), ['numero_mecanografico_fk' => 'numero_mecanografico']);
    }
}
