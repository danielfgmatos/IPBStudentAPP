<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "teste".
 *
 * @property int $id_teste
 * @property string $titulo
 * @property string|null $nota
 * @property string|null $data_submetido
 * @property string $codigo_disciplina_fk
 * @property string $numero_mecanografico_fk
 *
 * @property Disciplina $codigoDisciplinaFk
 */
class Teste extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'teste';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['titulo', 'codigo_disciplina_fk', 'numero_mecanografico_fk'], 'required'],
            [['titulo', 'nota', 'data_submetido', 'codigo_disciplina_fk', 'numero_mecanografico_fk'], 'string', 'max' => 45],
            [['codigo_disciplina_fk'], 'exist', 'skipOnError' => true, 'targetClass' => Disciplina::className(), 'targetAttribute' => ['codigo_disciplina_fk' => 'codigo_disciplina']],
            [['numero_mecanografico_fk'], 'exist', 'skipOnError' => true, 'targetClass' => Aluno::className(), 'targetAttribute' => ['numero_mecanografico_fk' => 'numero_mecanografico']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_teste' => 'Id Teste',
            'titulo' => 'Titulo',
            'nota' => 'Nota',
            'data_submetido' => 'Data Submetido',
            'codigo_disciplina_fk' => 'Codigo Disciplina Fk',
            'numero_mecanografico_fk' => 'Numero Mecanografico Fk',
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

    public function getNumeroMecanograficoFk()
    {
        return $this->hasOne(Aluno::className(), ['numero_mecanografico' => 'numero_mecanografico_fk']);
    }
}
