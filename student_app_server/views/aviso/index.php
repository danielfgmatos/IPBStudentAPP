<?php

use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\models\AvisoSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Avisos';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="aviso-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Aviso', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id_aviso',
            'assunto',
            'autor',
            'data_modificado',
            'conteudo',
            //'codigo_disciplina_fk',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, Aviso $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id_aviso' => $model->id_aviso, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk]);
                 }
            ],
        ],
    ]); ?>


</div>
