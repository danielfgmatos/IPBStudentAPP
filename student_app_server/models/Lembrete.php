<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "lembrete".
 *
 * @property int $id_lembrete
 * @property string|null $tipo
 * @property string|null $data_inicio
 * @property string $calendar_date
 * @property string|null $data_vencimento
 * @property string|null $descricao
 * @property string $codigo_disciplina_fk
 * @property string $numero_mecanografico_fk
 *
 * @property Disciplina $codigoDisciplinaFk
 * @property Aluno $numeroMecanograficoFk
 */
class Lembrete extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'lembrete';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['data_inicio', 'data_vencimento', 'calendar_date'], 'safe'],
            [['calendar_date', 'codigo_disciplina_fk'], 'required'],
            [['tipo', 'codigo_disciplina_fk'], 'string', 'max' => 45],
            [['calendar_date', 'codigo_disciplina_fk', 'numero_mecanografico_fk'], 'required'],
            [['tipo', 'codigo_disciplina_fk', 'numero_mecanografico_fk'], 'string', 'max' => 45],
            [['descricao'], 'string', 'max' => 2000],
            [['numero_mecanografico_fk'], 'exist', 'skipOnError' => true, 'targetClass' => Aluno::className(), 'targetAttribute' => ['numero_mecanografico_fk' => 'numero_mecanografico']],
            [['codigo_disciplina_fk'], 'exist', 'skipOnError' => true, 'targetClass' => Disciplina::className(), 'targetAttribute' => ['codigo_disciplina_fk' => 'codigo_disciplina']],

        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_lembrete' => 'Id Lembrete',
            'tipo' => 'Tipo',
            'data_inicio' => 'Data Inicio',
            'data_vencimento' => 'Data Vencimento',
            'descricao' => 'Descricao',
            'calendar_date' => 'Calendar Date',
            'codigo_disciplina_fk' => 'Codigo Disciplina Fk',
        ];
    }

    public function fields()
    {
        return [
            'id_lembrete',
            'tipo' => function (Lembrete $model) {

                if ($model->tipo == 1) {
                    return 'Aviso';
                }
                if ($model->tipo == 2) {

                    return 'Lembrete';
                }

                if ($model->tipo == 3) {

                    return 'Teste';
                }

                if ($model->tipo == 4) {

                    return 'Atividade';
                }


            },

            'data_inicio',
            'data_vencimento',
            'descricao',
            'calendar_date',
            'codigo_disciplina_fk',
            'numero_mecanografico_fk',


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


    /**
     * Gets query for [[NumeroMecanograficoFk]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getNumeroMecanograficoFk()
    {
        return $this->hasOne(Aluno::className(), ['numero_mecanografico' => 'numero_mecanografico_fk']);
    }


}
