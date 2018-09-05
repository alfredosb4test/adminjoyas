import { NgModule } from '@angular/core';
import { FrmProductoComponent } from './frm-producto/frm-producto';
import { FrmUsuarioComponent } from './frm-usuario/frm-usuario';
import { DetalleVentasProdComponent } from './detalle-ventas-prod/detalle-ventas-prod';
import { DetallesAbonosProdComponent } from './detalles-abonos-prod/detalles-abonos-prod';
import { FrmAddAbonoComponent } from './frm-add-abono/frm-add-abono';
@NgModule({
	declarations: [FrmProductoComponent,
    FrmUsuarioComponent,
    DetalleVentasProdComponent,
    DetallesAbonosProdComponent,
    FrmAddAbonoComponent],
	imports: [],
	exports: [FrmProductoComponent,
    FrmUsuarioComponent,
    DetalleVentasProdComponent,
    DetallesAbonosProdComponent,
    FrmAddAbonoComponent]
})
export class ComponentsModule {}
