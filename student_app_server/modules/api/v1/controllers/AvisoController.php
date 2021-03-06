<?php

namespace app\modules\api\v1\controllers;



use app\models\Aviso;
use app\models\BlocoAula;
use app\modules\api\v1\resources\UserResource;

use DOMDocument;
use Yii;
use yii\db\Query;
use yii\filters\auth\HttpBearerAuth;
use yii\httpclient\Client;
use yii\rest\ActiveController;
use simplehtmldom\HtmlDocument;


/**
 * Default controller for the `api-v1` module
 */
class AvisoController extends ActiveController
{
    public $modelClass = 'app\models\Aviso';
    /**
     * Renders the index view for the module
     * @return array|array[]|string
     */
    public function behaviors()
    {
        $behaviours = parent::behaviors(); // TODO: Change the autogenerated stub
        $behaviours['authenticator']['authMethods'] = [
            HttpBearerAuth::class
        ];

        return $behaviours;
    }
    public function actionGetAviso( $codigo_disciplina, $sessionCookie)
    {

        $user = UserResource::findOne(Yii::$app->user->identity);
        $userSessionId = $user->sessionId;


        $clientAviso = new Client(['baseUrl' => 'https://testing.estig.ipb.pt/sakai-ws/rest/',
            'responseConfig' => [
                'format' => Client::FORMAT_JSON
            ],]);

        $responseAviso = $clientAviso->get('sakai/getPagesAndToolsForSiteForCurrentUser', ['sessionid' => $userSessionId, 'siteid' => $codigo_disciplina])->setHeaders(['content-type' => 'application/json'])->send();
        $xml = simplexml_load_string($responseAviso->content);


        //$length = count($titles);

        $length = count($xml->pages->page);
        for ($i = 0; $i < $length; $i++) {
            if ($xml->pages->page[$i]->{'page-title'} == "Avisos") {
                $toolId = $xml->pages->page[$i]->tools->tool->attributes()->id;
            };

        }


        try {
            $ch = curl_init();

            // Check if initialization had gone wrong*
            if ($ch === false) {
                throw new Exception('failed to initialize');
            }
            // Better to explicitly set URL


            curl_setopt($ch, CURLOPT_URL, "https://testing.estig.ipb.pt/portal/site/$codigo_disciplina/tool-reset/$toolId?panel=Main&sakai_action=doChange_pagesize&selectPageSize=200");
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_COOKIE, "$sessionCookie");
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
            // That needs to be set; content will spill to STDOUT otherwise
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            // Set more options
            $content = curl_exec($ch);


            if ($content === false) {
                throw new Exception(curl_error($ch), curl_errno($ch));
            }

            // Check HTTP return code, too; might be something else than 200
            $httpReturnCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

            $html = new HtmlDocument();
            $html->load($content);


            $titles = [];
            $dates = [];
            $authors = [];
            $links = [];
            $avisos = [];
            foreach ($html->find('td[headers="author"]') as $author) {

                array_push($authors, trim(strip_tags(html_entity_decode($author))));


            }


            foreach ($html->find('td[headers=date]') as $date) {
                array_push($dates, strip_tags($date->plaintext));
            }


            foreach ($html->find('th>strong>a>span[class=skip]') as $titulo) {
                array_push($titles, trim(html_entity_decode($titulo->plaintext)));

            }


            foreach ($html->find('th>strong>a') as $link) {
                array_push($links, html_entity_decode($link->getAttribute('href')));

            }

            $mensagens = [];

            foreach ($links as $link) {

                try {

                    $ch2 = curl_init();

                    // Check if initialization had gone wrong*
                    if ($ch2 === false) {
                        throw new Exception('failed to initialize');
                    }
                    // Better to explicitly set URL

                    curl_setopt($ch2, CURLOPT_URL, $link);
                    curl_setopt($ch2, CURLOPT_FOLLOWLOCATION, true);
                    curl_setopt($ch2, CURLOPT_COOKIE, "$sessionCookie");
                    curl_setopt($ch2, CURLOPT_SSL_VERIFYHOST, FALSE);
                    curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, FALSE);
                    // That needs to be set; content will spill to STDOUT otherwise
                    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1);
                    // Set more options
                    $content2 = curl_exec($ch2);

                    if ($content2 === false) {
                        throw new Exception(curl_error($ch2), curl_errno($ch2));
                    }

                    // Check HTTP return code, too; might be something else than 200
                    $httpReturnCode = curl_getinfo($ch2, CURLINFO_HTTP_CODE);

                    $html2 = new HtmlDocument();
                    $html2->load($content2);


                    foreach ($html2->find('div[class=message-body]') as $mensagem) {

                        array_push($mensagens, strip_tags(html_entity_decode($mensagem->plaintext)));

                    }


                } catch (Exception $e) {

                    trigger_error(sprintf(
                        'Curl failed with error #%d: %s',
                        $e->getCode(), $e->getMessage()),
                        E_USER_ERROR);
                }

            }
            $length = count($titles);


            for ($i = 0; $i < $length; $i++) {
                array_unshift($avisos, (object)['id' => $i + 1, 'titulo' => $titles[$i], 'autor' => $authors[$i], 'data' => $dates[$i], 'mensagem' => $mensagens[$i]]);

            }


        } catch (Exception $e) {

            trigger_error(sprintf(
                'Curl failed with error #%d: %s',
                $e->getCode(), $e->getMessage()),
                E_USER_ERROR);
        }


        $connection = \Yii::$app->db;

        foreach ($avisos as $aviso) {
            $connection->createCommand()->upsert('aviso', [
                'id_aviso' => $aviso->id,
                'assunto' => $aviso->titulo,
                'autor' => $aviso->autor,
                'data_modificado' => $aviso->data,
                'conteudo' => $aviso->mensagem,
                'codigo_disciplina_fk' => $codigo_disciplina,

            ])->execute();


        }

        $query = new Query();

        return $query
            ->from('aviso')
            ->where(['codigo_disciplina_fk' => $codigo_disciplina])
            ->all();
    }

public function actionFetchAviso ($codigo_disciplina)
{
    $query = new Query();
    return $query
        ->from('aviso')
        ->where(['codigo_disciplina_fk' => $codigo_disciplina])
        ->all();
}

}
