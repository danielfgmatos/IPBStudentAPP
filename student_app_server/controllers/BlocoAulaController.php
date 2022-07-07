<?php

namespace app\controllers;

use app\models\BlocoAula;
use app\models\BlocoAulaSearch;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * BlocoAulaController implements the CRUD actions for BlocoAula model.
 */
class BlocoAulaController extends Controller
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
     * Lists all BlocoAula models.
     *
     * @return string
     */
    public function actionIndex()
    {
        $searchModel = new BlocoAulaSearch();
        $dataProvider = $searchModel->search($this->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single BlocoAula model.
     * @param int $id_bloco Id Bloco
     * @param string $numero_mecanografico_fk Numero Mecanografico Fk
     * @return string
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($id_bloco, $numero_mecanografico_fk)
    {
        return $this->render('view', [
            'model' => $this->findModel($id_bloco, $numero_mecanografico_fk),
        ]);
    }

    /**
     * Creates a new BlocoAula model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return string|\yii\web\Response
     */
    public function actionCreate()
    {
        $model = new BlocoAula();

        if ($this->request->isPost) {
            if ($model->load($this->request->post()) && $model->save()) {
                return $this->redirect(['view', 'id_bloco' => $model->id_bloco, 'numero_mecanografico_fk' => $model->numero_mecanografico_fk]);
            }
        } else {
            $model->loadDefaultValues();
        }

        return $this->render('create', [
            'model' => $model,
        ]);
    }

    /**
     * Updates an existing BlocoAula model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param int $id_bloco Id Bloco
     * @param string $numero_mecanografico_fk Numero Mecanografico Fk
     * @return string|\yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($id_bloco, $numero_mecanografico_fk)
    {
        $model = $this->findModel($id_bloco, $numero_mecanografico_fk);

        if ($this->request->isPost && $model->load($this->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id_bloco' => $model->id_bloco, 'numero_mecanografico_fk' => $model->numero_mecanografico_fk]);
        }

        return $this->render('update', [
            'model' => $model,
        ]);
    }

    /**
     * Deletes an existing BlocoAula model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param int $id_bloco Id Bloco
     * @param string $numero_mecanografico_fk Numero Mecanografico Fk
     * @return \yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete($id_bloco, $numero_mecanografico_fk)
    {
        $this->findModel($id_bloco, $numero_mecanografico_fk)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the BlocoAula model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param int $id_bloco Id Bloco
     * @param string $numero_mecanografico_fk Numero Mecanografico Fk
     * @return BlocoAula the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id_bloco, $numero_mecanografico_fk)
    {
        if (($model = BlocoAula::findOne(['id_bloco' => $id_bloco, 'numero_mecanografico_fk' => $numero_mecanografico_fk])) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }
}
