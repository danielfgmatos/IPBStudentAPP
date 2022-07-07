<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "bloco_aula".
 *
 * @property int $id_bloco
 * @property string $data_inicio
 * @property string $data_fim
 * @property string $sala
 * @property string $nome_disciplina
 * @property string $numero_mecanografico_fk
 * @property string $cor
 * @property int $visivel
 *
 * @property Inscricao $numeroMecanograficoFk
 */
class BlocoAula extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'bloco_aula';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['data_inicio', 'data_fim', 'sala', 'nome_disciplina', 'numero_mecanografico_fk', 'cor', 'visivel'], 'required'],
            [['data_inicio', 'data_fim'], 'safe'],
            [['visivel'], 'integer'],
            [['sala', 'nome_disciplina'], 'string', 'max' => 100],
            [['numero_mecanografico_fk', 'cor'], 'string', 'max' => 30],
            [['numero_mecanografico_fk'], 'exist', 'skipOnError' => true, 'targetClass' => Inscricao::className(), 'targetAttribute' => ['numero_mecanografico_fk' => 'numero_mecanografico_fk']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_bloco' => 'Id Bloco',
            'data_inicio' => 'Data Inicio',
            'data_fim' => 'Data Fim',
            'sala' => 'Sala',
            'nome_disciplina' => 'Nome Disciplina',
            'numero_mecanografico_fk' => 'Numero Mecanografico Fk',
            'cor' => 'Cor',
            'visivel' => 'Visivel',
        ];
    }

    /**
     * Gets query for [[NumeroMecanograficoFk]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getNumeroMecanograficoFk()
    {
        return $this->hasOne(Inscricao::className(), ['numero_mecanografico_fk' => 'numero_mecanografico_fk']);
    }
}
