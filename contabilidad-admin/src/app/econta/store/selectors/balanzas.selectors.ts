import { createSelector } from "@ngrx/store";

import * as fromRoot from "../../../store";
import * as fromFeature from "../reducers";
import * as fromBalanzas from "../reducers/balanzas.reducer";

import { Balanza } from "../../models";

import * as _ from "lodash";

export const getBalanzasState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.balanzas
);

export const getBalanzasEntities = createSelector(
  getBalanzasState,
  fromBalanzas.selectEntities
);

export const getBalanzas = createSelector(
  getBalanzasState,
  fromBalanzas.selectAll
);

export const getBalanzasLoading = createSelector(
  getBalanzasState,
  fromBalanzas.getBalanzasLoading
);

export const getSelectedBalanza = createSelector(
  getBalanzasEntities,
  fromRoot.getRouterState,
  (entities, router): Balanza => {
    return router.state && entities[router.state.params.id];
  }
);

export const getSelectedBalanzaId = createSelector(
  getSelectedBalanza,
  saldo => (saldo ? saldo.id : undefined)
);

export const getBalanzasLoaded = createSelector(
  getBalanzasState,
  fromBalanzas.getBalanzasLoaded
);

export const getBalanzasEmpresa = createSelector(
  getBalanzasState,
  fromBalanzas.getBalanzasEmpresa
);
