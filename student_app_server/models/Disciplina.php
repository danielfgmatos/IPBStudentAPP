<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "disciplina".
 *
 * @property string $codigo_disciplina
 * @property string $nome
 *
 * @property Aviso[] $avisos
 * @property Inscricao[] $inscricaos
 * @property Lembrete[] $lembretes
 * @property Mensagem[] $mensagems
 * @property Aluno[] $numeroMecanograficoFks
 * @property Recurso[] $recursos
 * @property Teste[] $testes
 * @property Trabalho[] $trabalhos
 */
class Disciplina extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'disciplina';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['codigo_disciplina', 'nome'], 'required'],
            [['codigo_disciplina', 'nome'], 'string', 'max' => 45],
            [['codigo_disciplina'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'codigo_disciplina' => 'Codigo Disciplina',
            'nome' => 'Nome',
        ];
    }

    /**
     * Gets query for [[Avisos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getAvisos()
    {
        return $this->hasMany(Aviso::className(), ['codigo_disciplina_fk' => 'codigo_disciplina']);
    }

    /**
     * Gets query for [[Inscricaos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getInscricaos()
    {
        return $this->hasMany(Inscricao::className(), ['codigo_disciplina' => 'codigo_disciplina']);
    }

    /**
     * Gets query for [[Lembretes]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getLembretes()
    {
        return $this->hasMany(Lembrete::className(), ['codigo_disciplina_fk' => 'codigo_disciplina']);
    }

    /**
     * Gets query for [[Mensagems]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getMensagems()
    {
        return $this->hasMany(Mensagem::className(), ['codigo_disciplina_fk' => 'codigo_disciplina']);
    }

    /**
     * Gets query for [[NumeroMecanograficoFks]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getNumeroMecanograficoFks()
    {
        return $this->hasMany(Aluno::className(), ['numero_mecanografico' => 'numero_mecanografico_fk'])->viaTable('inscricao', ['codigo_disciplina' => 'codigo_disciplina']);
    }

    /**
     * Gets query for [[Recursos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getRecursos()
    {
        return $this->hasMany(Recurso::className(), ['codigo_disciplina_fk' => 'codigo_disciplina']);
    }

    /**
     * Gets query for [[Testes]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getTestes()
    {
        return $this->hasMany(Teste::className(), ['codigo_disciplina_fk' => 'codigo_disciplina']);
    }

    /**
     * Gets query for [[Trabalhos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getTrabalhos()
    {
        return $this->hasMany(Trabalho::className(), ['codigo_disciplina_fk' => 'codigo_disciplina']);
    }
}
