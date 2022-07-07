<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Inscricao;

/**
 * InscricaoSearch represents the model behind the search form of `app\models\Inscricao`.
 */
class InscricaoSearch extends Inscricao
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['numero_mecanografico_fk', 'codigo_disciplina', 'turno_tp', 'turno_tpr', 'turno_pl', 'ano_letivo'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Inscricao::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere(['like', 'numero_mecanografico_fk', $this->numero_mecanografico_fk])
            ->andFilterWhere(['like', 'codigo_disciplina', $this->codigo_disciplina])
            ->andFilterWhere(['like', 'turno_tp', $this->turno_tp])
            ->andFilterWhere(['like', 'turno_tpr', $this->turno_tpr])
            ->andFilterWhere(['like', 'turno_pl', $this->turno_pl])
            ->andFilterWhere(['like', 'ano_letivo', $this->ano_letivo]);

        return $dataProvider;
    }
}
