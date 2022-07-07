<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\BlocoAula */

$this->title = 'Update Bloco Aula: ' . $model->id_bloco;
$this->params['breadcrumbs'][] = ['label' => 'Bloco Aulas', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id_bloco, 'url' => ['view', 'id_bloco' => $model->id_bloco, 'numero_mecanografico_fk' => $model->numero_mecanografico_fk]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="bloco-aula-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
