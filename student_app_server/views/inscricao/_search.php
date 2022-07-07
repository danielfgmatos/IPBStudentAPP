<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\InscricaoSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="inscricao-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'numero_mecanografico_fk') ?>

    <?= $form->field($model, 'codigo_disciplina') ?>

    <?= $form->field($model, 'turno_tp') ?>

    <?= $form->field($model, 'turno_tpr') ?>

    <?= $form->field($model, 'turno_pl') ?>

    <?php // echo $form->field($model, 'ano_letivo') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
