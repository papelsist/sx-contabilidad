import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromPolizas from '../reducers/polizas.reducer';
import * as fromContext from '../reducers/ui-context.reducre';
import { Poliza } from '../../models';

import * as _ from 'lodash';

export const getPolizasState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.polizas
);

export const getPolizasEntities = createSelector(
  getPolizasState,
  fromPolizas.selectEntities
);

export const getPolizas = createSelector(
  getPolizasState,
  fromPolizas.selectAll
);

export const getPolizasLoading = createSelector(
  getPolizasState,
  fromPolizas.getPolizasLoading
);

export const getSelectedPoliza = createSelector(
  getPolizasEntities,
  fromRoot.getRouterState,
  (entities, router): Poliza => {
    return router.state && entities[router.state.params.polizaId];
  }
);

export const getSelectedPolizaId = createSelector(
  getSelectedPoliza,
  cuenta => (cuenta ? cuenta.id : undefined)
);

export const getPolizasFilter = createSelector(
  getPolizasState,
  fromPolizas.getPolizasFilter
);

export const getPolizasSearchTerm = createSelector(
  getPolizasState,
  fromPolizas.getPolizasSearchTerm
);

export const getPolizasLoaded = createSelector(
  getPolizasState,
  fromPolizas.getPolizasLoaded
);

/**
 * Selector de vital importancia ya que regresa el grupo de poliza vigente
 * entendiendo como gupo de poliza el tipo y subtipo de la misma. Utiliza el RouterState
 * ya que estos datos estan; por diseño; incluidos en la ruta vigente, esto mediante
 * QueryParams
 */
export const getCurrentPolizaGroup = createSelector(
  fromRoot.getRouterState,
  (router): { tipo: string; subtipo: string } => {
    return (
      router.state && {
        tipo: router.state.queryParams.tipo,
        subtipo: router.state.queryParams.subtipo
      }
    );
  }
);

/**
 * Selector que para obtener el filtro de polizas vigente, esto es el grupo de polizas
 * (stipo y subtipo) y el periodo de las mismas (ejercicio, mes). El objeto es de tipo
 * PolizaFilter y es  para determinar el tipo de poliza
 * con el que se está interactuando. El estado que represneta Tipo,Subtipo,Ejercicio y Mes
 * es util en muchos contenedores y API calls por lo que representa un enomre ahorro de infra estructura
 * el poder agrupar las polizas de esta manera.
 */
export const getCurrentPeriodoGrupo = createSelector(
  getCurrentPolizaGroup,
  fromFeature.getPeriodoDePolizas,
  (grupo, periodo) => {
    return {
      ...grupo,
      ...periodo
    };
  }
);
