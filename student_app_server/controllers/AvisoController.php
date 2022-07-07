<?php

namespace app\controllers;

use app\models\Aviso;
use app\models\AvisoSearch;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * AvisoController implements the CRUD actions for Aviso model.
 */
class AvisoController extends Controller
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
     * Lists all Aviso models.
     *
     * @return string
     */
    public function actionIndex()
    {
        $searchModel = new AvisoSearch();
        $dataProvider = $searchModel->search($this->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Aviso model.
     * @param int $id_aviso Id Aviso
     * @param string $codigo_disciplina_fk Codigo Disciplina Fk
     * @return string
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($id_aviso, $codigo_disciplina_fk)
    {
        return $this->render('view', [
            'model' => $this->findModel($id_aviso, $codigo_disciplina_fk),
        ]);
    }

    /**
     * Creates a new Aviso model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return string|\yii\web\Response
     */
    public function actionCreate()
    {
        $model = new Aviso();

        if ($this->request->isPost) {
            if ($model->load($this->request->post()) && $model->save()) {
                return $this->redirect(['view', 'id_aviso' => $model->id_aviso, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk]);
            }
        } else {
            $model->loadDefaultValues();
        }

        return $this->render('create', [
            'model' => $model,
        ]);
    }

    /**
     * Updates an existing Aviso model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param int $id_aviso Id Aviso
     * @param string $codigo_disciplina_fk Codigo Disciplina Fk
     * @return string|\yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($id_aviso, $codigo_disciplina_fk)
    {
        $model = $this->findModel($id_aviso, $codigo_disciplina_fk);

        if ($this->request->isPost && $model->load($this->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id_aviso' => $model->id_aviso, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk]);
        }

        return $this->render('update', [
            'model' => $model,
        ]);
    }

    /**
     * Deletes an existing Aviso model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param int $id_aviso Id Aviso
     * @param string $codigo_disciplina_fk Codigo Disciplina Fk
     * @return \yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete($id_aviso, $codigo_disciplina_fk)
    {
        $this->findModel($id_aviso, $codigo_disciplina_fk)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Aviso model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param int $id_aviso Id Aviso
     * @param string $codigo_disciplina_fk Codigo Disciplina Fk
     * @return Aviso the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id_aviso, $codigo_disciplina_fk)
    {
        if (($model = Aviso::findOne(['id_aviso' => $id_aviso, 'codigo_disciplina_fk' => $codigo_disciplina_fk])) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }
}
