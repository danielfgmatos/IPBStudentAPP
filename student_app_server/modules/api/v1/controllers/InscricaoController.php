<?php

namespace app\modules\api\v1\controllers;

use app\models\Inscricao;
use app\models\LembreteSearch;
use Yii;
use yii\db\Query;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;
use yii\web\Controller;

/**
 * Default controller for the `api-v1` module
 */
class InscricaoController extends ActiveController
{
    public $modelClass = 'app\models\Inscricao';
    public function behaviors()
    {
        $behaviours = parent::behaviors(); // TODO: Change the autogenerated stub
        $behaviours['authenticator']['authMethods'] = [
            HttpBearerAuth::class
        ];

        return $behaviours;
    }

    public function actionGetInscricao(){

        $connection = new Query();
        $numeroMecanografico = Yii::$app->user->identity->numero_mecanografico;
/*


      return $connection->createCommand("SELECT inscricao.numero_mecanografico_fk, inscricao.turno_tp, inscricao.turno_tpr, inscricao.turno_pl, inscricao.ano_letivo, inscricao.semestre, disciplina.codigo_disciplina, disciplina.nome  FROM inscricao INNER JOIN disciplina ON inscricao.codigo_disciplina = disciplina.codigo_disciplina WHERE inscricao.ano_letivo = YEAR(CURRENT_DATE)-1 AND inscricao.numero_mecanografico_fk=$numeroMecanografico")->queryAll();*/
return $connection->select(['inscricao.*', 'disciplina.codigo_disciplina', 'disciplina.nome'])
    ->from('inscricao')
    ->innerJoin('disciplina', 'inscricao.codigo_disciplina = disciplina.codigo_disciplina')
    ->where([ 'inscricao.numero_mecanografico_fk'=>$numeroMecanografico])->all();

    }
    public function actionCreate()
    {
        return $this->render('create');
    }
}