<?php

namespace app\modules\api\v1\controllers;

use app\models\Lembrete;
use app\models\LembreteSearch;
use app\modules\api\v1\resources\UserResource;
use Yii;
use yii\db\Query;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;
use yii\web\Controller;

/**
 * Default controller for the `api-v1` module
 */
class LembreteController extends ActiveController
{
    public $modelClass = 'app\models\Lembrete';


    public function behaviors()
    {
        $behaviours = parent::behaviors(); // TODO: Change the autogenerated stub
        $behaviours['authenticator']['authMethods'] = [
            HttpBearerAuth::class
        ];

        return $behaviours;
    }

    public function actionGetLembrete()
    {

        $connection = new Query();

        $user = UserResource::findOne(Yii::$app->user->identity);
$userNumeroMecanografico = $user->numero_mecanografico;

        //return $connection->createCommand(`SELECT lembrete.id_lembrete, lembrete.tipo, lembrete.data_inicio, lembrete.data_vencimento, lembrete.descricao, lembrete.codigo_disciplina_fk, lembrete.calendar_date, disciplina.nome FROM lembrete
        // INNER JOIN disciplina ON lembrete.codigo_disciplina_fk = disciplina.codigo_disciplina
        // INNER JOIN inscricao ON disciplina.codigo_disciplina = inscricao.codigo_disciplina
        // WHERE numero_mecanografico_fk="$userNumeroMecanografico"`)->queryAll();
 return $connection
    ->select(['lembrete.*','disciplina.nome'])
    ->from('lembrete')
     ->where(['numero_mecanografico_fk' => $userNumeroMecanografico])
    ->innerJoin('disciplina','lembrete.codigo_disciplina_fk = disciplina.codigo_disciplina')->orderBy(['lembrete.data_vencimento'=>SORT_ASC])
    ->all();


    }


    public function actionGetLembreteDisciplina($codigo_disciplina) {
        $connection = new Query();
        $user = UserResource::findOne(Yii::$app->user->identity);
        $userNumeroMecanografico = $user->numero_mecanografico;

        return $connection
            ->select('*')
            ->from('lembrete')
            ->where(['numero_mecanografico_fk' => $userNumeroMecanografico, 'codigo_disciplina_fk'=> $codigo_disciplina])->orderBy(['data_vencimento'=>SORT_ASC])
            ->all();


    }

    public function actionDeleteLembrete($id_lembrete, $codigo_disciplina_fk)
    {
        $connection = new Query();

        return $connection
          ->createCommand()
            ->delete('lembrete',['id_lembrete'=>$id_lembrete, 'codigo_disciplina_fk'=>$codigo_disciplina_fk])
            ->execute();

    }

    public function actionUpdateLembrete($id_lembrete, $tipo, $data_inicio, $data_vencimento, $calendar_date, $descricao, $codigo_disciplina_fk, $numero_mecanografico_fk) {

        $modelLembrete = Lembrete::find()->where(['id_lembrete' => $id_lembrete])->one();
        $modelLembrete->tipo = $tipo;
        $modelLembrete->data_inicio = $data_inicio;
        $modelLembrete->data_vencimento = $data_vencimento;
        $modelLembrete->calendar_date = $calendar_date;
        $modelLembrete->descricao = $descricao;
        $modelLembrete->codigo_disciplina_fk = $codigo_disciplina_fk;
        $modelLembrete->numero_mecanografico_fk = $numero_mecanografico_fk;

        if( $modelLembrete->save()) {
            return true;
        } return false;


    }
    public function actionCreate()
    {
        return $this->render('create');
    }
}
