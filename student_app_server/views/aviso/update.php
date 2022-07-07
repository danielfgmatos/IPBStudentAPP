<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Aviso */

$this->title = 'Update Aviso: ' . $model->id_aviso;
$this->params['breadcrumbs'][] = ['label' => 'Avisos', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id_aviso, 'url' => ['view', 'id_aviso' => $model->id_aviso, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="aviso-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
