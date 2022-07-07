<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Lembrete;

/**
 * LembreteSearch represents the model behind the search form of `app\models\Lembrete`.
 */
class LembreteSearch extends Lembrete
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id_lembrete'], 'integer'],
            [['tipo', 'data_inicio', 'data_vencimento', 'descricao', 'codigo_disciplina_fk'], 'safe'],
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
        $query = Lembrete::find();

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
            'id_lembrete' => $this->id_lembrete,
            'data_inicio' => $this->data_inicio,
            'data_vencimento' => $this->data_vencimento,
        ]);

        $query->andFilterWhere(['like', 'tipo', $this->tipo])
            ->andFilterWhere(['like', 'descricao', $this->descricao])
            ->andFilterWhere(['like', 'codigo_disciplina_fk', $this->codigo_disciplina_fk]);

        return $dataProvider;
    }
}
