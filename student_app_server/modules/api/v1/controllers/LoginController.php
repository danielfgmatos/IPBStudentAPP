<?php

namespace app\modules\api\v1\controllers;


use app\models\Aluno;
use app\models\User;
use app\modules\api\v1\models\LoginForm;
use app\modules\api\v1\resources\UserResource;
use phpDocumentor\Reflection\Types\String_;
use simplehtmldom\HtmlDocument;
use Yii;
use yii\helpers\Console;
use yii\rest\Controller;
use yii\httpclient\Client;
use function GuzzleHttp\Psr7\str;

class LoginController extends Controller
{
   private function actionLoginServer($username, $password, $responseLoginSakai, $emailUtilizador, $nomeUtilizador, $resultch2)
    {



        if (User::find()->select('token')->where(['numero_mecanografico' => $username])->one() == null) {
            $tokenVar = \Yii::$app->security->generateRandomString(255);
            $userNovo = new UserResource();
            $userNovo->numero_mecanografico = $username;
            $userNovo->password_hash = Yii::$app->security->generatePasswordHash($tokenVar);
            $userNovo->sessionId = $responseLoginSakai->content;
            $userNovo->email = $emailUtilizador->content;
            $userNovo->nome = $nomeUtilizador->content;
            $userNovo->api_key = $resultch2;
            $userNovo->token = $tokenVar;

            if ($userNovo->save()) {


                return $this->actionLoginServer($username, $password, $responseLoginSakai, $emailUtilizador, $nomeUtilizador, $resultch2);
            } else {
                return "Erro";
            }
        } else {
            $passwordVar = User::find()->select('token')->where(['numero_mecanografico' => $username])->one();
            $model = new LoginForm();
            $model->numero_mecanografico = $username;
            $model->password_hash = $passwordVar->token;

            if ($model->login()) {

                $modelUser = User::find()->where(['numero_mecanografico' => Yii::$app->user->identity->numero_mecanografico])->one();
                $modelUser->sessionId = $responseLoginSakai->content;
                $modelUser->api_key = $resultch2;
                $modelUser->save();

                return $model->getUser();
            }
        }
    }

    public function actionIndex($username, $password)
    {

        $client = new Client(['baseUrl' => 'https://testing.estig.ipb.pt/sakai-ws/rest/',
            'responseConfig' => [
                'format' => Client::FORMAT_JSON
            ],]);

        $responseLoginSakai = $client->post('login/login/', ['id' => $username, 'pw' => $password])->setHeaders(['content-type' => 'application/json'])->send();

        if ($responseLoginSakai->statusCode == 200) {
            $nomeUtilizador = $client->get('sakai/getUserDisplayNameForCurrentUser', ['sessionid' => $responseLoginSakai->content])->setHeaders(['content-type' => 'application/json'])->send();
            $emailUtilizador = $client->get('sakai/getUserEmailForCurrentUser', ['sessionid' => $responseLoginSakai->content])->setHeaders(['content-type' => 'application/json'])->send();
            $postFields = array(
                "eid" => $username,
                "pw" => $password,
                "submit" => "Login",
            );

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "https://testing.estig.ipb.pt/portal/xlogin");
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postFields));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_HEADER, 1);
            $result = curl_exec($ch);

            preg_match_all('/^Set-Cookie:\s*([^;]*)/mi', $result, $matches);

            foreach ($matches[1] as $item) {
                $cookies = $item;
            }
            curl_close($ch);

            $ch2 = curl_init();

            curl_setopt($ch2, CURLOPT_USERAGENT, 'curl/7.79.1');
            curl_setopt($ch2, CURLOPT_URL, "https://apps.ipb.pt/sumarios/rest/aluno/apikey");
            curl_setopt($ch2, CURLOPT_SSL_VERIFYHOST, FALSE);
            curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch2, CURLOPT_CUSTOMREQUEST, 'GET');
            curl_setopt($ch2, CURLOPT_USERPWD, $username . ':' . $password);
            $resultch2 = curl_exec($ch2);

            curl_close($ch2);

            return [$this->actionLoginServer($username, $password, $responseLoginSakai, $emailUtilizador, $nomeUtilizador, $resultch2), $cookies, $resultch2];

        } else {
            return false;
        }
    }

    public function actionLogout()
    {
        $resultLogout = Yii::$app->user->logout();

        return $resultLogout;
    }

}
