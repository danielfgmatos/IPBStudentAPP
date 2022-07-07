<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Aviso;

/**
 * AvisoSearch represents the model behind the search form of `app\models\Aviso`.
 */
class AvisoSearch extends Aviso
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id_aviso'], 'integer'],
            [['assunto', 'autor', 'data_modificado', 'conteudo', 'codigo_disciplina_fk'], 'safe'],
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
        $query = Aviso::find();

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
            'id_aviso' => $this->id_aviso,
            'data_modificado' => $this->data_modificado,
        ]);

        $query->andFilterWhere(['like', 'assunto', $this->assunto])
            ->andFilterWhere(['like', 'autor', $this->autor])
            ->andFilterWhere(['like', 'conteudo', $this->conteudo])
            ->andFilterWhere(['like', 'codigo_disciplina_fk', $this->codigo_disciplina_fk]);

        return $dataProvider;
    }
}
