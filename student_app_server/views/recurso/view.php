<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\models\Recurso */

$this->title = $model->id_recurso;
$this->params['breadcrumbs'][] = ['label' => 'Recursos', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="recurso-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'id_recurso' => $model->id_recurso, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'id_recurso' => $model->id_recurso, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk], [
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
            'id_recurso',
            'nome',
            'autor',
            'data_modificado',
            'codigo_disciplina_fk',
            'ficheiro',
        ],
    ]) ?>

</div>
