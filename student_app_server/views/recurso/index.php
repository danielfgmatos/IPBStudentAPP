<?php

use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\models\RecursoSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Recursos';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="recurso-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Recurso', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id_recurso',
            'nome',
            'autor',
            'data_modificado',
            'codigo_disciplina_fk',
            //'ficheiro',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, Recurso $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id_recurso' => $model->id_recurso, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk]);
                 }
            ],
        ],
    ]); ?>


</div>
