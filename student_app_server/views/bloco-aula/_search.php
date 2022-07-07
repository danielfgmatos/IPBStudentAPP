<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\BlocoAulaSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="bloco-aula-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'id_bloco') ?>

    <?= $form->field($model, 'data_inicio') ?>

    <?= $form->field($model, 'data_fim') ?>

    <?= $form->field($model, 'sala') ?>

    <?= $form->field($model, 'nome_disciplina') ?>

    <?php // echo $form->field($model, 'numero_mecanografico_fk') ?>

    <?php // echo $form->field($model, 'cor') ?>

    <?php // echo $form->field($model, 'visivel') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
