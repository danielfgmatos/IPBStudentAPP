<?php

namespace app\modules\api\v1\controllers;

use app\modules\api\v1\resources\UserResource;
use app\modules\methods\getStringBetween;
use app\widgets\Alert;
use Yii;
use yii\db\Query;
use yii\filters\auth\HttpBearerAuth;
use yii\httpclient\Client;
use yii\rest\ActiveController;
use yii\web\Controller;


/**
 * Default controller for the `api-v1` module
 */
class HorarioController extends ActiveController
{
    public $modelClass = 'app\models\BlocoAula';



    public static function actionGetHorario($api_key)

    {
        $user = UserResource::findOne(Yii::$app->user->identity);
        $userNumeroMecanografico = $user->numero_mecanografico;

        $connection = Yii::$app->db;
        $connection->createCommand()->delete('bloco_aula',['numero_mecanografico_fk' => $userNumeroMecanografico])->execute();

        $blocos = [];

        $client = new Client(['baseUrl' => 'https://apps.ipb.pt/sumarios/',
            'responseConfig' => [
                'format' => Client::FORMAT_JSON
            ],]);

        $responseHorario = $client->get("rest/aluno/horario?apikey=$api_key")->setHeaders(['content-type' => 'application/json', 'user-agent' => 'curl/7.79.1'])->send();

        $resposta = json_decode($responseHorario->content);


        $connection = \Yii::$app->db;

        foreach ($resposta as $bloco) {
            $connection->createCommand()->upsert('bloco_aula', [
                'data_inicio' => $bloco->aula->inicio,
                'data_fim' => $bloco->aula->fim,
                'sala' => $bloco->sala,
                'nome_disciplina' => $bloco->disciplinas,
                'numero_mecanografico_fk' => Yii::$app->user->identity->numero_mecanografico,
                'cor' => '#811B55',
                'visivel' => 1
            ])->execute();
        }

    }


    public function actionFetchHorario()
    {
        $user = Yii::$app->user->identity->numero_mecanografico;
        $query = new Query();
        return $query
            ->from('bloco_aula')
            ->where(['numero_mecanografico_fk' => $user, 'visivel'=> '1'])
            ->all();

    }
}
