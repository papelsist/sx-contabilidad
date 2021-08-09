import { Grupo } from './grupo';

export const POLIZAS_2019 = [
  new Grupo('INGRESO', 'Ingreso', 'Pólizas de ingresos', [
    new Grupo('INGRESOS_CON', 'Ingresos CON', 'Contado'),
    new Grupo('INGRESOS_COD', 'Ingresos COD', 'COD'),
    new Grupo('INGRESOS_CRE', 'Ingresos CRE', 'Credito'),
    new Grupo('INGRESOS_CHE', 'Ingresos CHE', 'Cheques Devueltos'),
    new Grupo('INGRESOS_JUR', 'Ingresos JUR', 'Juridico'),
    new Grupo(
      'INTERESES_PRESTAMO_CHOFERES',
      'Intereses prestamos ',
      'Prestamos choferes'
    )
  ]),
  new Grupo('EGRESO', 'Egreso', 'Pólizas de egresos', [
    new Grupo('CHEQUES', 'Cheques', 'Pagos con cheque'),
    new Grupo('TRANSFERENCIAS', 'Transferencias', 'Pagos con transferencia'),
    new Grupo('COMISIONES_TARJETA', 'Comisiones Tarjeta', 'Comisiones')
  ]),
  new Grupo('DIARIO', 'Diario', 'Pólizas de diario', [

    new Grupo(
      'NOTAS_DE_CARGO',
      'Notas de cargos',
      'Pólizas de notas de cargo'
    ),
    new Grupo('NOTAS_DE_CREDITO_DEV', 'Devoluciones', ''),
    new Grupo('NOTAS_DE_CREDITO_BON', 'Bonificaciones', ''),
    new Grupo('ANTICIPOS', 'Anticipos', ''),
    new Grupo('COMPRAS', 'Compras', ''),
    new Grupo(
      'DESCUENTOS_COMPRAS',
      'Descuentos en compras',
      'Notas de credito CXP'
    ),
    new Grupo('INVENTARIOS', 'Inventarios', ''),
    new Grupo('ACTIVO_FIJO', 'Activo fijo', ''),
    new Grupo('CHEQUES_EN_TRANSITO', 'Cheques en transito', ''),
    new Grupo('DEPOSITOS_EN_TRANSITO', 'Depósitos en tránsito', ''),
    new Grupo('TESORERIA', 'Tesorería', ''),
    new Grupo('DEPOSITOS_TESORERIA', 'Depositos', 'Depositos de tesorería'),
    new Grupo('PROVISION_DE_GASTOS', 'Provisión de gastos', ''),
    new Grupo('PROVISION_DE_REMBOLSO', 'Provisión de rembolso', ''),
    new Grupo('PROVISION_DE_FLETES', 'Provisión de fletes', ''),
    new Grupo('PROVISION_DE_SEGUROS', 'Provisión de seguros', ''),
    new Grupo('COMISIONES_BANCARIA_GASTO', 'Comisiones bancarias gasto', ''),
    new Grupo('PROVISION_NOMINA', 'Provisión de nómina', ''),
    new Grupo('PROVISION_DE_CARGA_SOCIAL', 'Provisión de carga social', ''),
    new Grupo('VARIACION_CAMBIARIA', 'Variacion Cambiaria', ''),
    new Grupo('IMPUESTOS_SOBRE_NOMINA', 'Impuesto Sobre Nomina', ''),
    new Grupo('TRASPASO_IVA', 'Traspaso Iva', ''),
    new Grupo('CIERRE_ANUAL', 'Cierre anual', ''),
    new Grupo('CIERRE_MENSUAL', 'Cierre Mensual', ''),
    new Grupo('ACTIVO_FIJO', 'Activo Fijo', ''),
    new Grupo('ACTIVO_FIJO_BAJA', 'Baja de Activo', '')
  ])
];
