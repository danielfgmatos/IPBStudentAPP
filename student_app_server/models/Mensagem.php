<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "mensagem".
 *
 * @property int $id_mensagem
 * @property string|null $tipo
 * @property string|null $assunto
 * @property string $data
 * @property string $autor_mensagem
 * @property string $destinatario
 * @property string|null $conteudo
 * @property string $codigo_disciplina_fk
 *
 * @property Disciplina $codigoDisciplinaFk
 */
class Mensagem extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'mensagem';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['data', 'autor_mensagem', 'destinatario', 'codigo_disciplina_fk'], 'required'],
            [['data'], 'safe'],
            [['tipo', 'assunto', 'autor_mensagem', 'destinatario', 'codigo_disciplina_fk'], 'string', 'max' => 45],
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
            'id_mensagem' => 'Id Mensagem',
            'tipo' => 'Tipo',
            'assunto' => 'Assunto',
            'data' => 'Data',
            'autor_mensagem' => 'Autor Mensagem',
            'destinatario' => 'Destinatario',
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
