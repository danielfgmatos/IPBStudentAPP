<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\models\Inscricao */

$this->title = $model->numero_mecanografico_fk;
$this->params['breadcrumbs'][] = ['label' => 'Inscricaos', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="inscricao-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'numero_mecanografico_fk' => $model->numero_mecanografico_fk, 'codigo_disciplina' => $model->codigo_disciplina], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'numero_mecanografico_fk' => $model->numero_mecanografico_fk, 'codigo_disciplina' => $model->codigo_disciplina], [
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
            'numero_mecanografico_fk',
            'codigo_disciplina',
            'turno_tp',
            'turno_tpr',
            'turno_pl',
            'ano_letivo',
        ],
    ]) ?>

</div>
