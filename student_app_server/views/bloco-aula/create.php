<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\BlocoAula */

$this->title = 'Create Bloco Aula';
$this->params['breadcrumbs'][] = ['label' => 'Bloco Aulas', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="bloco-aula-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
