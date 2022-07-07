<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Trabalho */

$this->title = 'Create Trabalho';
$this->params['breadcrumbs'][] = ['label' => 'Trabalhos', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="trabalho-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
