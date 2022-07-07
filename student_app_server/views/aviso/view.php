<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\models\Aviso */

$this->title = $model->id_aviso;
$this->params['breadcrumbs'][] = ['label' => 'Avisos', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="aviso-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'id_aviso' => $model->id_aviso, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'id_aviso' => $model->id_aviso, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'id_aviso',
            'assunto',
            'autor',
            'data_modificado',
            'conteudo',
            'codigo_disciplina_fk',
        ],
    ]) ?>

</div>
