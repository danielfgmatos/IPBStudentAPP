<?php

namespace app\controllers;

use app\models\Disciplina;
use app\models\DisciplinaSearch;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;


/**
 * DisciplinaController implements the CRUD actions for Disciplina model.
 */
class DisciplinaController extends Controller
{
    /**
     * @inheritDoc
     */
    public function behaviors()
    {
        return array_merge(
            parent::behaviors(),
            [
                'verbs' => [
                    'class' => VerbFilter::className(),
                    'actions' => [
                        'delete' => ['POST'],
                    ],
                ],
            ]
        );
    }

    /**
     * Lists all Disciplina models.
     *
     * @return string
     */

    function console_log( $data ){
        echo '<script>';
        echo 'console.log('.  json_encode($data)  .')';
        echo '</script>';
    }

    public function actionIndex()
    {

        $soapLogin = new \SoapClient('https://testing.estig.ipb.pt/sakai-ws/soap/login?wsdl');
        $responseLogin = $soapLogin->login("a31611","Kilo208kmlb");
        $soapDisciplina = new \SoapClient('https://testing.estig.ipb.pt/sakai-ws/soap/sakai?wsdl');

        $responseDisciplina = $soapDisciplina->getAllSitesForCurrentUser($responseLogin);

        $responseDescription = $soapDisciplina->getSiteDescription($responseLogin,'0c067700-7ea6-11e6-8139-000c293e4489');

        $this->console_log($responseDescription);


        $searchModel = new DisciplinaSearch();
        $dataProvider = $searchModel->search($this->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Disciplina model.
     * @param string $codigo_disciplina Codigo Disciplina
     * @return string
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($codigo_disciplina)
    {
        return $this->render('view', [
            'model' => $this->findModel($codigo_disciplina),
        ]);
    }

    /**
     * Creates a new Disciplina model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return string|\yii\web\Response
     */
    public function actionCreate()
    {
        $model = new Disciplina();

    //    $xml = simplexml_load_string($responseDisciplina);


      /*  $connection = \Yii::$app->db;

            foreach ($xml->item as $item) {
                $connection->createCommand()->insert('disciplina', [
                    'codigo_disciplina' => $item->siteId,
                    'nome' => $item->siteTitle,
                ])->execute();





            }*/



    }

    /**
     * Updates an existing Disciplina model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param string $codigo_disciplina Codigo Disciplina
     * @return string|\yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($codigo_disciplina)
    {
        $model = $this->findModel($codigo_disciplina);

        if ($this->request->isPost && $model->load($this->request->post()) && $model->save()) {
            return $this->redirect(['view', 'codigo_disciplina' => $model->codigo_disciplina]);
        }

        return $this->render('update', [
            'model' => $model,
        ]);
    }

    /**
     * Deletes an existing Disciplina model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param string $codigo_disciplina Codigo Disciplina
     * @return \yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete($codigo_disciplina)
    {
        $this->findModel($codigo_disciplina)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Disciplina model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param string $codigo_disciplina Codigo Disciplina
     * @return Disciplina the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($codigo_disciplina)
    {
        if (($model = Disciplina::findOne(['codigo_disciplina' => $codigo_disciplina])) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }
}
