<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Recurso;

/**
 * RecursoSearch represents the model behind the search form of `app\models\Recurso`.
 */
class RecursoSearch extends Recurso
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id_recurso'], 'integer'],
            [['nome', 'autor', 'data_modificado', 'codigo_disciplina_fk', 'ficheiro'], 'safe'],
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
        $query = Recurso::find();

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
            'id_recurso' => $this->id_recurso,
            'data_modificado' => $this->data_modificado,
        ]);

        $query->andFilterWhere(['like', 'nome', $this->nome])
            ->andFilterWhere(['like', 'autor', $this->autor])
            ->andFilterWhere(['like', 'codigo_disciplina_fk', $this->codigo_disciplina_fk])
            ->andFilterWhere(['like', 'ficheiro', $this->ficheiro]);

        return $dataProvider;
    }
}
