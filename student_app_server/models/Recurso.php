<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "recurso".
 *
 * @property int $id_recurso
 * @property string $nome
 * @property string $autor
 * @property string $data_modificado
 * @property string $codigo_disciplina_fk
 * @property resource $ficheiro
 *
 * @property Disciplina $codigoDisciplinaFk
 */
class Recurso extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'recurso';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nome', 'autor', 'data_modificado', 'codigo_disciplina_fk', 'ficheiro'], 'required'],
            [['data_modificado'], 'safe'],
            [['ficheiro'], 'string'],
            [['nome', 'autor', 'codigo_disciplina_fk'], 'string', 'max' => 45],
            [['codigo_disciplina_fk'], 'exist', 'skipOnError' => true, 'targetClass' => Disciplina::className(), 'targetAttribute' => ['codigo_disciplina_fk' => 'codigo_disciplina']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_recurso' => 'Id Recurso',
            'nome' => 'Nome',
            'autor' => 'Autor',
            'data_modificado' => 'Data Modificado',
            'codigo_disciplina_fk' => 'Codigo Disciplina Fk',
            'ficheiro' => 'Ficheiro',
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
