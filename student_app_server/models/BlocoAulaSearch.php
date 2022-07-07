<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\BlocoAula;

/**
 * BlocoAulaSearch represents the model behind the search form of `app\models\BlocoAula`.
 */
class BlocoAulaSearch extends BlocoAula
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id_bloco', 'visivel'], 'integer'],
            [['data_inicio', 'data_fim', 'sala', 'nome_disciplina', 'numero_mecanografico_fk', 'cor'], 'safe'],
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
        $query = BlocoAula::find();

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
        $query->andFilterWhere([
            'id_bloco' => $this->id_bloco,
            'data_inicio' => $this->data_inicio,
            'data_fim' => $this->data_fim,
            'visivel' => $this->visivel,
        ]);

        $query->andFilterWhere(['like', 'sala', $this->sala])
            ->andFilterWhere(['like', 'nome_disciplina', $this->nome_disciplina])
            ->andFilterWhere(['like', 'numero_mecanografico_fk', $this->numero_mecanografico_fk])
            ->andFilterWhere(['like', 'cor', $this->cor]);

        return $dataProvider;
    }
}
