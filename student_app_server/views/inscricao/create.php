<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Inscricao */

$this->title = 'Create Inscricao';
$this->params['breadcrumbs'][] = ['label' => 'Inscricaos', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="inscricao-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
