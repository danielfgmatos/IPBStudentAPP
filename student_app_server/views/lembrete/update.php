<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Lembrete */

$this->title = 'Update Lembrete: ' . $model->id_lembrete;
$this->params['breadcrumbs'][] = ['label' => 'Lembretes', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id_lembrete, 'url' => ['view', 'id_lembrete' => $model->id_lembrete, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="lembrete-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
