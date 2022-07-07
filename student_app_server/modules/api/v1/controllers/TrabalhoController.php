<?php

namespace app\modules\api\v1\controllers;

use app\modules\api\v1\resources\UserResource;
use DOMDocument;
use DOMXPath;
use simplehtmldom\HtmlDocument;
use Yii;
use yii\db\Query;
use yii\filters\auth\HttpBearerAuth;
use yii\httpclient\Client;
use yii\rest\ActiveController;
use yii\web\Controller;



/**
 * Default controller for the `api-v1` module
 */
class TrabalhoController extends ActiveController
{
    public function behaviors()
    {
        $behaviours = parent::behaviors(); // TODO: Change the autogenerated stub
        $behaviours['authenticator']['authMethods'] = [
            HttpBearerAuth::class
        ];

        return $behaviours;
    }

    public $modelClass = 'app\models\Trabalho';

    public function actionCreateTrabalhos($codigo_disciplina,$sessionCookie)
    {
        $user = UserResource::findOne(Yii::$app->user->identity);
        $userSessionId = $user->sessionId;

        $client = new Client(['baseUrl' => 'https://testing.estig.ipb.pt/sakai-ws/rest/',
            'responseConfig' => [
                'format' => Client::FORMAT_JSON
            ],]);
        $responseTrabalho = $client->get('assignments/getAssignmentsForContext', ['sessionid' => $userSessionId, 'context' => $codigo_disciplina])->setHeaders(['content-type' => 'application/json', 'authorization' => `Bearer $user->token`])->send();

        $connection = \Yii::$app->db;
        $xml = simplexml_load_string($responseTrabalho->content);

        $responseTool = $client->get('sakai/getPagesAndToolsForSiteForCurrentUser', ['sessionid' => $userSessionId, 'siteid' => $codigo_disciplina])->setHeaders(['content-type' => 'application/json'])->send();
        $xml2 = simplexml_load_string($responseTool->content);

        $length = count($xml2->pages->page);
        for ($i = 0; $i < $length; $i++) {
            if ($xml2->pages->page[$i]->{'page-title'} == "Atividades") {
                $toolId = $xml2->pages->page[$i]->tools->tool->attributes()->id;
            }
        }
        $assignments = [];
        $descricao = [];
        foreach ($xml->assignment as $assignment) {

            try {
                $ch = curl_init();

                // Check if initialization had gone wrong*
                if ($ch === false) {
                    throw new Exception('failed to initialize');
                }
                // Better to explicitly set URL

                // https://testing.estig.ipb.pt/portal/site/56bacd40-1f6a-11ec-9ee6-fa163e8fa201/tool/b7ab6a4f-758e-4146-aca6-c108f30d6147?assignmentReference=/assignment/a/56bacd40-1f6a-11ec-9ee6-fa163e8fa201/2ebd49f0-c3d1-4d47-9c94-ca9a4cf0b131&sakai_action=doView_submission
                $assignmentId = $assignment->attributes()->id;
                curl_setopt($ch, CURLOPT_URL, "https://testing.estig.ipb.pt/portal/site/$codigo_disciplina/tool-reset/$toolId?assignmentReference=/assignment/a/$codigo_disciplina/$assignmentId&sakai_action=doView_submission");
                curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
                curl_setopt($ch, CURLOPT_COOKIE, "$sessionCookie");
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
                // That needs to be set; content will spill to STDOUT otherwise
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                // Set more options
                $content2 = curl_exec($ch);


                if ($content2 === false) {
                    throw new Exception(curl_error($ch), curl_errno($ch));
                }

                // Check HTTP return code, too; might be something else than 200
                $httpReturnCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

                $html = new DOMDocument();
                @$html->loadHTML($content2);
                $xpath = new DOMXPath($html);

                $queryPath = $xpath->query('(//div[contains(@class,"textPanel")][1])');

                if($queryPath->length == 0){
                    array_push($descricao, ['content' => '']);
                }
                else{
                    foreach ($queryPath as $mensagem){
                        array_push($descricao, ['content' => $mensagem->textContent]);
                    }
                }

            } catch (Exception $e) {

                trigger_error(sprintf(
                    'Curl failed with error #%d: %s',
                    $e->getCode(), $e->getMessage()),
                    E_USER_ERROR);
            }
        }

        foreach($xml-> assignment as $assignment)
        {
            $xml->assignment->attributes()->description = 'abcde';
            array_push($assignments, current($assignment->attributes()));
        }

        $size = count($assignments);

        $newarray = [];

        for ($i = 0; $i < $size; $i++) {
            //array_push($assignments[$i], $assignments[$i]['content'] = $descricao[$i]{'Content'});
            $newarray[$i] = $assignments[$i] + $descricao[$i];
        }



        $connection = \Yii::$app->db;


        $length = count($newarray);
        $finalArray = [];
        for ($i = 0; $i < $length; $i++) {

            array_push($finalArray,$newarray[$i]);
        }


       foreach ($finalArray as $trabalho) {


          $connection->createCommand()->upsert('trabalho', [

                'titulo' => $trabalho['title'],
                'data_inicio' => $trabalho['openTime'],
                'descricao' => $trabalho['content'],
                'data_vencimento'=> $trabalho['dueTime'],
                'codigo_disciplina_fk' => $codigo_disciplina,
            ])->execute();


        }

        $query = new Query();
        return $query
            ->from('trabalho')
            ->where(['codigo_disciplina_fk' => $codigo_disciplina])
            ->all();

    }

    public function actionGetTrabalhos ($codigo_disciplina)
    {
        $query = new Query();
        return $query
            ->from('trabalho')
            ->where(['codigo_disciplina_fk' => $codigo_disciplina])
            ->all();

    }
}