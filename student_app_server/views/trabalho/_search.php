<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\TrabalhoSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="trabalho-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'id_trabalho') ?>

    <?= $form->field($model, 'titulo') ?>

    <?= $form->field($model, 'estado') ?>

    <?= $form->field($model, 'data_inicio') ?>

    <?= $form->field($model, 'data_vencimento') ?>

    <?php // echo $form->field($model, 'codigo_disciplina_fk') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
