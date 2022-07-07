<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\models\Lembrete */

$this->title = $model->id_lembrete;
$this->params['breadcrumbs'][] = ['label' => 'Lembretes', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="lembrete-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'id_lembrete' => $model->id_lembrete, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'id_lembrete' => $model->id_lembrete, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk], [
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
            'id_lembrete',
            'tipo',
            'data_inicio',
            'data_vencimento',
            'descricao',
            'codigo_disciplina_fk',
        ],
    ]) ?>

</div>
