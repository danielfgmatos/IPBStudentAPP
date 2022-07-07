<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\models\Mensagem */

$this->title = $model->id_mensagem;
$this->params['breadcrumbs'][] = ['label' => 'Mensagems', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="mensagem-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'id_mensagem' => $model->id_mensagem, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'id_mensagem' => $model->id_mensagem, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk], [
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
            'id_mensagem',
            'tipo',
            'assunto',
            'data',
            'autor_mensagem',
            'destinatario',
            'conteudo',
            'codigo_disciplina_fk',
        ],
    ]) ?>

</div>
