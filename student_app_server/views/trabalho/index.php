<?php

use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\models\TrabalhoSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Trabalhos';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="trabalho-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Trabalho', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id_trabalho',
            'titulo',
            'estado',
            'data_inicio',
            'data_vencimento',
            //'codigo_disciplina_fk',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, Trabalho $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id_trabalho' => $model->id_trabalho, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk]);
                 }
            ],
        ],
    ]); ?>


</div>
