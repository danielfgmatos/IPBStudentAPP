<?php

use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\models\BlocoAulaSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Bloco Aulas';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="bloco-aula-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Bloco Aula', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id_bloco',
            'data_inicio',
            'data_fim',
            'sala',
            'nome_disciplina',
            //'numero_mecanografico_fk',
            //'cor',
            //'visivel',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, BlocoAula $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id_bloco' => $model->id_bloco, 'numero_mecanografico_fk' => $model->numero_mecanografico_fk]);
                 }
            ],
        ],
    ]); ?>


</div>
