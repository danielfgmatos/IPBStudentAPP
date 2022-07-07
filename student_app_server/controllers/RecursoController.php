<?php

namespace app\controllers;

use app\models\Recurso;
use app\models\RecursoSearch;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * RecursoController implements the CRUD actions for Recurso model.
 */
class RecursoController extends Controller
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
     * Lists all Recurso models.
     *
     * @return string
     */
    public function actionIndex()
    {
        $searchModel = new RecursoSearch();
        $dataProvider = $searchModel->search($this->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Recurso model.
     * @param int $id_recurso Id Recurso
     * @param string $codigo_disciplina_fk Codigo Disciplina Fk
     * @return string
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($id_recurso, $codigo_disciplina_fk)
    {
        return $this->render('view', [
            'model' => $this->findModel($id_recurso, $codigo_disciplina_fk),
        ]);
    }

    /**
     * Creates a new Recurso model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return string|\yii\web\Response
     */
    public function actionCreate()
    {
        $model = new Recurso();

        if ($this->request->isPost) {
            if ($model->load($this->request->post()) && $model->save()) {
                return $this->redirect(['view', 'id_recurso' => $model->id_recurso, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk]);
            }
        } else {
            $model->loadDefaultValues();
        }

        return $this->render('create', [
            'model' => $model,
        ]);
    }

    /**
     * Updates an existing Recurso model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param int $id_recurso Id Recurso
     * @param string $codigo_disciplina_fk Codigo Disciplina Fk
     * @return string|\yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($id_recurso, $codigo_disciplina_fk)
    {
        $model = $this->findModel($id_recurso, $codigo_disciplina_fk);

        if ($this->request->isPost && $model->load($this->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id_recurso' => $model->id_recurso, 'codigo_disciplina_fk' => $model->codigo_disciplina_fk]);
        }

        return $this->render('update', [
            'model' => $model,
        ]);
    }

    /**
     * Deletes an existing Recurso model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param int $id_recurso Id Recurso
     * @param string $codigo_disciplina_fk Codigo Disciplina Fk
     * @return \yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete($id_recurso, $codigo_disciplina_fk)
    {
        $this->findModel($id_recurso, $codigo_disciplina_fk)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Recurso model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param int $id_recurso Id Recurso
     * @param string $codigo_disciplina_fk Codigo Disciplina Fk
     * @return Recurso the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id_recurso, $codigo_disciplina_fk)
    {
        if (($model = Recurso::findOne(['id_recurso' => $id_recurso, 'codigo_disciplina_fk' => $codigo_disciplina_fk])) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }
}
