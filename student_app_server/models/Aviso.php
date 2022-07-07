<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "aviso".
 *
 * @property int $id_aviso
 * @property string $assunto
 * @property string $autor
 * @property string $data_modificado
 * @property string $conteudo
 * @property string $codigo_disciplina_fk
 *
 * @property Disciplina $codigoDisciplinaFk
 */
class Aviso extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'aviso';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['assunto', 'autor', 'data_modificado', 'conteudo', 'codigo_disciplina_fk'], 'required'],
            [['assunto'], 'string', 'max' => 200],
            [['autor', 'codigo_disciplina_fk'], 'string', 'max' => 45],
            [['data_modificado'], 'string', 'max' => 50],
            [['conteudo'], 'string', 'max' => 2500],
            [['codigo_disciplina_fk'], 'exist', 'skipOnError' => true, 'targetClass' => Disciplina::className(), 'targetAttribute' => ['codigo_disciplina_fk' => 'codigo_disciplina']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_aviso' => 'Id Aviso',
            'assunto' => 'Assunto',
            'autor' => 'Autor',
            'data_modificado' => 'Data Modificado',
            'conteudo' => 'Conteudo',
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
