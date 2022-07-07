<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "trabalho".
 *
 * @property int $id_trabalho
 * @property string $titulo
 * @property string $estado
 * @property string $data_inicio
 * @property string $data_vencimento
 * @property string $codigo_disciplina_fk
 *
 * @property Disciplina $codigoDisciplinaFk
 */
class Trabalho extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'trabalho';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['titulo', 'estado', 'data_inicio', 'data_vencimento', 'codigo_disciplina_fk'], 'required'],
            [['data_inicio', 'data_vencimento'], 'safe'],
            [['titulo', 'estado', 'codigo_disciplina_fk'], 'string', 'max' => 45],
            [['codigo_disciplina_fk'], 'exist', 'skipOnError' => true, 'targetClass' => Disciplina::className(), 'targetAttribute' => ['codigo_disciplina_fk' => 'codigo_disciplina']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_trabalho' => 'Id Trabalho',
            'titulo' => 'Titulo',
            'estado' => 'Estado',
            'data_inicio' => 'Data Inicio',
            'data_vencimento' => 'Data Vencimento',
            'codigo_disciplina_fk' => 'Codigo Disciplina Fk',
        ];
    }

    /**
     * Gets query for [[CodigoDisciplinaFk]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCodigoDisciplinaFk()
    {
        return $this->hasOne(Disciplina::className(), ['codigo_disciplina' => 'codigo_disciplina_fk']);
    }
}
