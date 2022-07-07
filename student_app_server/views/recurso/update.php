<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Recurso */

$this->title = 'Update Recurso: ' . $model->id_recurso;
$this->params['breadcrumbs'][] = ['label' => 'Recursos', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id_recurso, 'url' => ['view', 'id_recurso' => $model->id_recurso, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="recurso-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
