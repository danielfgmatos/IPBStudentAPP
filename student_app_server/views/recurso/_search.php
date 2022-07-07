<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\RecursoSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="recurso-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'id_recurso') ?>

    <?= $form->field($model, 'nome') ?>

    <?= $form->field($model, 'autor') ?>

    <?= $form->field($model, 'data_modificado') ?>

    <?= $form->field($model, 'codigo_disciplina_fk') ?>

    <?php // echo $form->field($model, 'ficheiro') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
