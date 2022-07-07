<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Inscricao */

$this->title = 'Update Inscricao: ' . $model->numero_mecanografico_fk;
$this->params['breadcrumbs'][] = ['label' => 'Inscricaos', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->numero_mecanografico_fk, 'url' => ['view', 'numero_mecanografico_fk' => $model->numero_mecanografico_fk, 'codigo_disciplina' => $model->codigo_disciplina]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="inscricao-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
