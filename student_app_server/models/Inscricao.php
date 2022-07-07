<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "inscricao".
 *
 * @property string $numero_mecanografico_fk
 * @property string $codigo_disciplina
 * @property string|null $turno_tp
 * @property string|null $turno_tpr
 * @property string|null $turno_pl
 * @property string $ano_letivo
 * @property int|null $semestre
 *
 * @property BlocoAula[] $blocoAulas
 * @property Disciplina $codigoDisciplina
 * @property Aluno $numeroMecanograficoFk
 */
class Inscricao extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'inscricao';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['numero_mecanografico_fk', 'codigo_disciplina', 'ano_letivo'], 'required'],
            [['semestre'], 'integer'],
            [['numero_mecanografico_fk'], 'string', 'max' => 30],
            [['codigo_disciplina', 'turno_tp', 'turno_tpr', 'turno_pl', 'ano_letivo'], 'string', 'max' => 45],
            [['numero_mecanografico_fk', 'codigo_disciplina'], 'unique', 'targetAttribute' => ['numero_mecanografico_fk', 'codigo_disciplina']],
            [['numero_mecanografico_fk'], 'exist', 'skipOnError' => true, 'targetClass' => Aluno::className(), 'targetAttribute' => ['numero_mecanografico_fk' => 'numero_mecanografico']],
            [['codigo_disciplina'], 'exist', 'skipOnError' => true, 'targetClass' => Disciplina::className(), 'targetAttribute' => ['codigo_disciplina' => 'codigo_disciplina']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'numero_mecanografico_fk' => 'Numero Mecanografico Fk',
            'codigo_disciplina' => 'Codigo Disciplina',
            'turno_tp' => 'Turno Tp',
            'turno_tpr' => 'Turno Tpr',
            'turno_pl' => 'Turno Pl',
            'ano_letivo' => 'Ano Letivo',
            'semestre' => 'Semestre',
        ];
    }

    /**
     * Gets query for [[BlocoAulas]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getBlocoAulas()
    {
        return $this->hasMany(BlocoAula::className(), ['numero_mecanografico_fk' => 'numero_mecanografico_fk', 'codigo_disciplina_fk' => 'codigo_disciplina']);
    }

    /**
     * Gets query for [[CodigoDisciplina]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCodigoDisciplina()
    {
        return $this->hasOne(Disciplina::className(), ['codigo_disciplina' => 'codigo_disciplina']);
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
