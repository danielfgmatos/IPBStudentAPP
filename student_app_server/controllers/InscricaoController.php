<?php

namespace app\controllers;

use app\models\Inscricao;
use app\models\InscricaoSearch;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * InscricaoController implements the CRUD actions for Inscricao model.
 */
class InscricaoController extends Controller
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
     * Lists all Inscricao models.
     *
     * @return string
     */




    public function actionIndex()
    {
        $searchModel = new InscricaoSearch();
        $dataProvider = $searchModel->search($this->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Inscricao model.
     * @param string $numero_mecanografico_fk Numero Mecanografico Fk
     * @param string $codigo_disciplina Codigo Disciplina
     * @return string
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($numero_mecanografico_fk, $codigo_disciplina)
    {
        return $this->render('view', [
            'model' => $this->findModel($numero_mecanografico_fk, $codigo_disciplina),
        ]);
    }

    /**
     * Creates a new Inscricao model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return string|\yii\web\Response
     */
    public function actionCreate()
    {
        $model = new Inscricao();




        if ($this->request->isPost) {
            if ($model->load($this->request->post()) && $model->save()) {
                return $this->redirect(['view', 'numero_mecanografico_fk' => $model->numero_mecanografico_fk, 'codigo_disciplina' => $model->codigo_disciplina]);
            }
        } else {
            $model->loadDefaultValues();
        }

        return $this->render('create', [
            'model' => $model,
        ]);
    }

    /**
     * Updates an existing Inscricao model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param string $numero_mecanografico_fk Numero Mecanografico Fk
     * @param string $codigo_disciplina Codigo Disciplina
     * @return string|\yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($numero_mecanografico_fk, $codigo_disciplina)
    {
        $model = $this->findModel($numero_mecanografico_fk, $codigo_disciplina);

        if ($this->request->isPost && $model->load($this->request->post()) && $model->save()) {
            return $this->redirect(['view', 'numero_mecanografico_fk' => $model->numero_mecanografico_fk, 'codigo_disciplina' => $model->codigo_disciplina]);
        }

        return $this->render('update', [
            'model' => $model,
        ]);
    }

    /**
     * Deletes an existing Inscricao model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param string $numero_mecanografico_fk Numero Mecanografico Fk
     * @param string $codigo_disciplina Codigo Disciplina
     * @return \yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete($numero_mecanografico_fk, $codigo_disciplina)
    {
        $this->findModel($numero_mecanografico_fk, $codigo_disciplina)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Inscricao model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param string $numero_mecanografico_fk Numero Mecanografico Fk
     * @param string $codigo_disciplina Codigo Disciplina
     * @return Inscricao the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($numero_mecanografico_fk, $codigo_disciplina)
    {
        if (($model = Inscricao::findOne(['numero_mecanografico_fk' => $numero_mecanografico_fk, 'codigo_disciplina' => $codigo_disciplina])) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }
}
