<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\models\BlocoAula */

$this->title = $model->id_bloco;
$this->params['breadcrumbs'][] = ['label' => 'Bloco Aulas', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="bloco-aula-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'id_bloco' => $model->id_bloco, 'numero_mecanografico_fk' => $model->numero_mecanografico_fk], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'id_bloco' => $model->id_bloco, 'numero_mecanografico_fk' => $model->numero_mecanografico_fk], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'id_bloco',
            'data_inicio',
            'data_fim',
            'sala',
            'nome_disciplina',
            'numero_mecanografico_fk',
            'cor',
            'visivel',
        ],
    ]) ?>

</div>
