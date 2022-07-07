<?php

use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\models\MensagemSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Mensagems';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="mensagem-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Mensagem', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id_mensagem',
            'tipo',
            'assunto',
            'data',
            'autor_mensagem',
            //'destinatario',
            //'conteudo',
            //'codigo_disciplina_fk',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, Mensagem $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id_mensagem' => $model->id_mensagem, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk]);
                 }
            ],
        ],
    ]); ?>


</div>
