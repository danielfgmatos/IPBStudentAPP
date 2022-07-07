<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Trabalho */

$this->title = 'Update Trabalho: ' . $model->id_trabalho;
$this->params['breadcrumbs'][] = ['label' => 'Trabalhos', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id_trabalho, 'url' => ['view', 'id_trabalho' => $model->id_trabalho, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="trabalho-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
