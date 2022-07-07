<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Mensagem */

$this->title = 'Update Mensagem: ' . $model->id_mensagem;
$this->params['breadcrumbs'][] = ['label' => 'Mensagems', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id_mensagem, 'url' => ['view', 'id_mensagem' => $model->id_mensagem, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="mensagem-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
