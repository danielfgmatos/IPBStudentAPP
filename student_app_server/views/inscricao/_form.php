<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Inscricao */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="inscricao-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'numero_mecanografico_fk')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'codigo_disciplina')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'turno_tp')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'turno_tpr')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'turno_pl')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'ano_letivo')->textInput(['maxlength' => true]) ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
