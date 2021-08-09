import { createSelector } from "@ngrx/store";

import * as fromRoot from "../../../store";
import * as fromFeature from "../reducers";
import * as fromCatalogos from "../reducers/catalogos.reducer";

import { Catalogo } from "../../models";

import * as _ from "lodash";

export const getCatalogosState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.catalogos
);

export const getCatalogosEntities = createSelector(
  getCatalogosState,
  fromCatalogos.selectEntities
);

export const getCatalogos = createSelector(
  getCatalogosState,
  fromCatalogos.selectAll
);

export const getCatalogosLoading = createSelector(
  getCatalogosState,
  fromCatalogos.getCatalogosLoading
);

export const getSelectedCatalogo = createSelector(
  getCatalogosEntities,
  fromRoot.getRouterState,
  (entities, router): Catalogo =>
    router.state && entities[router.state.params.id]
);

export const getSelectedCatalogoId = createSelector(
  getSelectedCatalogo,
  catalogo => (catalogo ? catalogo.id : undefined)
);

export const getCatalogosLoaded = createSelector(
  getCatalogosState,
  fromCatalogos.getCatalogosLoaded
);

export const getCatalogosEmpresa = createSelector(
  getCatalogosState,
  fromCatalogos.getCatalogosEmpresa
);
