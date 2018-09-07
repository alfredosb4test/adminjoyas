//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Producto } from '../../interfaces/producto.interface';
import { Clientes } from '../../interfaces/cliente.interface';


const DB_NAME: string = 'joyeria.db';
const win: any = window;
var test_productos: Producto[] = []
var clientes: Clientes[] = []
var categorias: Clientes[] = []

@Injectable()
export class DatabaseProvider {
	public database: SQLiteObject;
  public dbReady = new BehaviorSubject<boolean>(false);
  public db: any; // emular base de datos en escritorio
   

  constructor(public platform:Platform, public sqlite:SQLite) { 
    this.platform.ready().then(()=>{

      if (platform._platforms[0] == 'cordova') {
      	console.log("Modo telefono");
        this.sqlite.create({
          name: 'joyeria.db',
          location: 'default'
        }) 
        .then((db:SQLiteObject)=>{
            console.log("sqlite.creae");
            this.database = db; 

        this.test_insertProd().then( r =>{
          this.dbReady.next(true);

        })
      /*  
            this.createTables().then( r =>{

              this.dbReady.next(true);
            })
      */
        })
      }else {
        console.log("Modo Escritorio");
        test_productos = [];
        this.db = win.openDatabase(DB_NAME, "1", "dbf1", 1024 * 1024 * 100);
        this.database = this.db;
        this.test_insertProd().then( r =>{
          this.dbReady.next(true);

        })
        //
      }   


    });
  }
 private createTables(){ 
/*  MySQL 
CREATE TABLE IF NOT EXISTS productos (
          idProducto int(11) NOT NULL AUTO_INCREMENT,
          nombre text,
          descripcion text,
          nota text,
          foto text,
          precio float,
          precio_venta float,
          cantidad int,
          activo int,
            PRIMARY KEY (idProducto)
        )
*/  

      //this.db = win.openDatabase(DB_NAME, "1", "dbf1", 1024 * 1024 * 100);
      //this.database = this.db; 
  console.log("CREATE TABLE Mobil")
    return  this.database.executeSql(
      `
        DROP TABLE IF EXISTS productos;
        DROP TABLE IF EXISTS clientes;
        DROP TABLE IF EXISTS ventas;
        DROP TABLE IF EXISTS abonos; 
        DROP TABLE IF EXISTS categorias;`
      )
      .then(()=>{
        return this.database.executeSql(
          `
          CREATE TABLE IF NOT EXISTS productos 
                      (idProducto INTEGER PRIMARY KEY AUTOINCREMENT,
                      nombre TEXT,
                      descripcion TEXT, 
                      nota TEXT, 
                      foto TEXT, 
                      precio REAL, 
                      precio_venta REAL, 
                      cantidad INTEGER, 
                      categoria INTEGER,
                      activo INTEGER);

          CREATE TABLE IF NOT EXISTS clientes (idCliente INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT,
                    direccion TEXT, 
                    telefono TEXT, 
                    foto TEXT, 
                    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    activo INTEGER);
          CREATE TABLE IF NOT EXISTS ventas (       
                    idVenta INTEGER PRIMARY KEY AUTOINCREMENT,
                    idProducto INTEGER,
                    idCliente INTEGER,
                    precio REAL,
                    status TEXT,
                    pagado INTEGER,
                    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY(idProducto) REFERENCES productos(idProducto)
                    );
          CREATE TABLE IF NOT EXISTS abonos (       
                    idAbono INTEGER PRIMARY KEY AUTOINCREMENT,
                    idVenta INTEGER,
                    abono REAL,
                    nota TEXT,
                    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY(idVenta) REFERENCES ventas(idVenta)
                    );
          CREATE TABLE IF NOT EXISTS categorias (       
                    idCategoria INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT,
                    activo INTEGER,
                    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    );
          ` )


      }).catch((err)=>console.log("error detected creating tables", JSON.stringify( err ) ));

  }  
  async test_insertProd(){
       // this.db = win.openDatabase(DB_NAME, "1", "dbf1", 1024 * 1024 * 100);
       // this.database = this.db;

       console.log("async test_insertProd")
    return await this.database.transaction( (tx: any) => {
      console.log("CREATE TABLE executeSql")
      
      tx.executeSql("DROP TABLE IF EXISTS productos;");
      tx.executeSql("DROP TABLE IF EXISTS clientes;");
      tx.executeSql("DROP TABLE IF EXISTS ventas;");
      tx.executeSql("DROP TABLE IF EXISTS abonos;");
      tx.executeSql("DROP TABLE IF EXISTS categorias;");

      tx.executeSql(`
          CREATE TABLE IF NOT EXISTS productos 
            (idProducto INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT,
            descripcion TEXT, 
            nota TEXT, 
            foto TEXT, 
            precio REAL, 
            precio_venta REAL, 
            cantidad INTEGER, 
            categoria INTEGER,
            activo INTEGER);`,[], function(tx, response){console.log(response)});
     
      tx.executeSql(`INSERT INTO productos ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo')  
        VALUES (?,?,?,?,?,?,?,?,?,?);
        `, [1,'prod 1','desc 1','nota','prod1.jpg',10,250,4,1,1], function(tx, response){console.log(response)});
      tx.executeSql(`INSERT INTO productos ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo')  
        VALUES (?,?,?,?,?,?,?,?,?,?);
        `, [2,'prod 2','desc 2','nota','prod2.jpg',10,13,1,1,1]);
      tx.executeSql(`INSERT INTO productos ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo')  
        VALUES (?,?,?,?,?,?,?,?,?,?);
        `, [3,'prod 3','desc 3','nota','prod3.jpg',10,14,2,1,1]);   
      tx.executeSql(`INSERT INTO productos ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo')  
        VALUES (?,?,?,?,?,?,?,?,?,?);
        `, [4,'prod 4','desc 4','nota','prod4.jpg',10,15,8,1,1]);   
      tx.executeSql(`INSERT INTO productos ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo')  
        VALUES (?,?,?,?,?,?,?,?,?,?);
        `, [5,'prod 5','desc 5','nota','prod5.jpg',10,15,5,1,1]);   
      tx.executeSql(`INSERT INTO productos ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo')  
        VALUES (?,?,?,?,?,?,?,?,?,?);
        `, [6,'prod 6','desc 6','nota','prod6.jpg',10,15,3,1,1]);   
      tx.executeSql(`INSERT INTO productos ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo')  
        VALUES (?,?,?,?,?,?,?,?,?,?);
        `, [7,'prod 7','desc 7','nota','prod7.jpg',10,15,9,1,1]);   
      tx.executeSql(`INSERT INTO productos ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo')  
        VALUES (?,?,?,?,?,?,?,?,?,?);
        `, [8,'prod 8','desc 8','nota','prod8.jpg',10,15,5,1,1]);   
      tx.executeSql(`INSERT INTO productos ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo')  
        VALUES (?,?,?,?,?,?,?,?,?,?);
        `, [9,'prod 9','desc 9','nota','prod9.jpg',10,15,1,1,1]);   
      tx.executeSql(`INSERT INTO productos ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo')  
        VALUES (?,?,?,?,?,?,?,?,?,?);
        `, [10,'prod 10','desc 10','nota','prod10.jpg',10,15,1,1,1]);                                                               

      tx.executeSql(`INSERT INTO productos ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo')  
        VALUES (?,?,?,?,?,?,?,?,?,?);
        `, [11,'prod 11','desc 1','nota','prod1.jpg',10,12,1,1,1]);
      tx.executeSql(`INSERT INTO productos ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo')  
        VALUES (?,?,?,?,?,?,?,?,?,?);
        `, [12,'prod 12','desc 2','nota','prod2.jpg',10,13,1,1,1]);
      tx.executeSql(`INSERT INTO productos ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo')  
        VALUES (?,?,?,?,?,?,?,?,?,?);
        `, [13,'prod 13','desc 3','nota','prod3.jpg',10,14,1,1,1]);   
      tx.executeSql(`INSERT INTO productos ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo')  
        VALUES (?,?,?,?,?,?,?,?,?,?);
        `, [14,'prod 14','desc 4','nota','prod4.jpg',10,15,1,1,1]);   
      tx.executeSql(`INSERT INTO productos ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo')  
        VALUES (?,?,?,?,?,?,?,?,?,?);
        `, [15,'prod 15','desc 5','nota','prod5.jpg',10,15,1,1,1]);   
      tx.executeSql(`INSERT INTO productos ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo')  
        VALUES (?,?,?,?,?,?,?,?,?,?);
        `, [16,'prod 16','desc 6','nota','prod6.jpg',10,15,1,1,1]);   
      tx.executeSql(`INSERT INTO productos ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo')  
        VALUES (?,?,?,?,?,?,?,?,?,?);
        `, [17,'prod 17','desc 7','nota','prod7.jpg',10,15,1,1,1]);   
      tx.executeSql(`INSERT INTO productos ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo')  
        VALUES (?,?,?,?,?,?,?,?,?,?);
        `, [18,'prod 18','desc 8','nota','prod8.jpg',10,15,1,1,1]);   
      tx.executeSql(`INSERT INTO productos ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo')  
        VALUES (?,?,?,?,?,?,?,?,?,?);
        `, [19,'prod 19','desc 9','nota','prod9.jpg',10,15,1,1,1]);   
      tx.executeSql(`INSERT INTO productos ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo')  
        VALUES (?,?,?,?,?,?,?,?,?,?);
        `, [20,'prod 20','desc 10','nota','prod10.jpg',10,15,1,1,1]);

   

      tx.executeSql(`CREATE TABLE IF NOT EXISTS clientes (idCliente INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        direccion TEXT, 
        telefono TEXT, 
        foto TEXT, 
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        activo INTEGER);`);
 
    
      tx.executeSql(`INSERT INTO clientes ('idCliente','nombre','direccion','telefono','foto','activo')  
        VALUES (?,?,?,?,?,?);
        `, [1,'user 1','dir 1','5533-30-60-87','',1]);      
      tx.executeSql(`INSERT INTO clientes ('idCliente','nombre','direccion','telefono','foto','activo')  
        VALUES (?,?,?,?,?,?);
        `, [2,'user 2','dir 2','5544-30-12-32','',1]);
       tx.executeSql(`INSERT INTO clientes ('idCliente','nombre','direccion','telefono','foto','activo')  
        VALUES (?,?,?,?,?,?);
        `, [3,'user 3','dir 3','5544-30-12-32','',1]);
      tx.executeSql(`INSERT INTO clientes ('idCliente','nombre','direccion','telefono','foto','activo')  
        VALUES (?,?,?,?,?,?);
        `, [4,'user 4','dir 4','5533-30-60-87','',1]);      
      tx.executeSql(`INSERT INTO clientes ('idCliente','nombre','direccion','telefono','foto','activo')  
        VALUES (?,?,?,?,?,?);
        `, [5,'user 5','dir 5','5544-30-12-32','',1]);
       tx.executeSql(`INSERT INTO clientes ('idCliente','nombre','direccion','telefono','foto','activo')  
        VALUES (?,?,?,?,?,?);
        `, [6,'user 6','dir 6','5544-30-12-32','',1]);
      tx.executeSql(`INSERT INTO clientes ('idCliente','nombre','direccion','telefono','foto','activo')  
        VALUES (?,?,?,?,?,?);
        `, [7,'user 7','dir 7','5533-30-60-87','',1]);      
      tx.executeSql(`INSERT INTO clientes ('idCliente','nombre','direccion','telefono','foto','activo')  
        VALUES (?,?,?,?,?,?);
        `, [8,'user 8','dir 8','5544-30-12-32','',1]);
       tx.executeSql(`INSERT INTO clientes ('idCliente','nombre','direccion','telefono','foto','activo')  
        VALUES (?,?,?,?,?,?);
        `, [9,'user 9','dir 9','5544-30-12-32','',1]); 
      tx.executeSql(`INSERT INTO clientes ('idCliente','nombre','direccion','telefono','foto','activo')  
        VALUES (?,?,?,?,?,?);
        `, [10,'user 10','dir 10','5533-30-60-87','',1]);      
      tx.executeSql(`INSERT INTO clientes ('idCliente','nombre','direccion','telefono','foto','activo')  
        VALUES (?,?,?,?,?,?);
        `, [11,'user 11','dir 11','5544-30-12-32','',1]);
       tx.executeSql(`INSERT INTO clientes ('idCliente','nombre','direccion','telefono','foto','activo')  
        VALUES (?,?,?,?,?,?);
        `, [12,'user 12','dir 12','5544-30-12-32','',1]);  
       tx.executeSql(`INSERT INTO clientes ('idCliente','nombre','direccion','telefono','foto','activo')  
        VALUES (?,?,?,?,?,?);
        `, [13,'user 13','dir 13','5544-30-12-32','',1]); 
       tx.executeSql(`INSERT INTO clientes ('idCliente','nombre','direccion','telefono','foto','activo')  
        VALUES (?,?,?,?,?,?);
        `, [14,'user 14','dir 14','5544-30-12-32','',1]); 
       tx.executeSql(`INSERT INTO clientes ('idCliente','nombre','direccion','telefono','foto','activo')  
        VALUES (?,?,?,?,?,?);
        `, [15,'user 15','dir 15','5544-30-12-32','',1]); 
       tx.executeSql(`INSERT INTO clientes ('idCliente','nombre','direccion','telefono','foto','activo')  
        VALUES (?,?,?,?,?,?);
        `, [16,'user 16','dir 16','5544-30-12-32','',1]); 
       tx.executeSql(`INSERT INTO clientes ('idCliente','nombre','direccion','telefono','foto','activo')  
        VALUES (?,?,?,?,?,?);
        `, [17,'user 17','dir 17','5544-30-12-32','',1]); 
       tx.executeSql(`INSERT INTO clientes ('idCliente','nombre','direccion','telefono','foto','activo')  
        VALUES (?,?,?,?,?,?);
        `, [18,'user 18','dir 18','5544-30-12-32','',1]);



      tx.executeSql(`CREATE TABLE IF NOT EXISTS ventas (       
          idVenta INTEGER PRIMARY KEY AUTOINCREMENT,
          idProducto INTEGER,
          idCliente INTEGER,
          precio REAL,
          status TEXT,
          pagado INTEGER,
          fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(idProducto) REFERENCES productos(idProducto)
          );`);

      tx.executeSql(`INSERT INTO ventas ('idProducto','idCliente','status','precio', 'pagado')  
        VALUES (?,?,?,?,?);
        `, [1,1,'pago pendiente', 180.00, 0]);  
      tx.executeSql(`INSERT INTO ventas ('idProducto','idCliente','status','precio', 'pagado')  
        VALUES (?,?,?,?,?);
        `, [1,4,'pago pendiente', 110.00, 0]);  
      tx.executeSql(`INSERT INTO ventas ('idProducto','idCliente','status','precio', 'pagado')  
        VALUES (?,?,?,?,?);
        `, [4,7,'pago pendiente', 320.00, 0]);  
      tx.executeSql(`INSERT INTO ventas ('idProducto','idCliente','status','precio', 'pagado')  
        VALUES (?,?,?,?,?);
        `, [12,7,'pago pendiente', 20.00, 0]); 
      tx.executeSql(`INSERT INTO ventas ('idProducto','idCliente','status','precio', 'pagado')  
        VALUES (?,?,?,?,?);
        `, [11,7,'pago pendiente', 20.00, 0]); 
      tx.executeSql(`INSERT INTO ventas ('idProducto','idCliente','status','precio', 'pagado')  
        VALUES (?,?,?,?,?);
        `, [14,7,'pago pendiente', 20.00, 0]); 
      tx.executeSql(`INSERT INTO ventas ('idProducto','idCliente','status','precio', 'pagado')  
        VALUES (?,?,?,?,?);
        `, [19,7,'pago pendiente', 20.00, 0]); 
      tx.executeSql(`INSERT INTO ventas ('idProducto','idCliente','status','precio', 'pagado')  
        VALUES (?,?,?,?,?);
        `, [18,7,'pago pendiente', 20.00, 0]); 
      tx.executeSql(`INSERT INTO ventas ('idProducto','idCliente','status','precio', 'pagado')  
        VALUES (?,?,?,?,?);
        `, [17,7,'pago pendiente', 20.00, 0]); 
      tx.executeSql(`INSERT INTO ventas ('idProducto','idCliente','status','precio', 'pagado')  
        VALUES (?,?,?,?,?);
        `, [11,7,'pagado', 20.00, 1]); 
      tx.executeSql(`INSERT INTO ventas ('idProducto','idCliente','status','precio', 'pagado')  
        VALUES (?,?,?,?,?);
        `, [14,1,'pagado', 20.00, 1]); 
      tx.executeSql(`INSERT INTO ventas ('idProducto','idCliente','status','precio', 'pagado')  
        VALUES (?,?,?,?,?);
        `, [14,3,'pagado', 20.00, 1]);                                                                            



      tx.executeSql(`CREATE TABLE IF NOT EXISTS categorias (       
          idCategoria INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT,
          activo INTEGER,
          fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );`);

      tx.executeSql(`INSERT INTO categorias ('idCategoria','nombre', 'activo')  
        VALUES (?,?,?);
        `, [1,'Generico', 1]); 


      tx.executeSql(`CREATE TABLE IF NOT EXISTS abonos (       
          idAbono INTEGER PRIMARY KEY AUTOINCREMENT,
          idVenta INTEGER,
          abono REAL,
          nota TEXT,
          fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(idVenta) REFERENCES ventas(idVenta)
          );`);

       tx.executeSql(`INSERT INTO abonos ('idVenta','abono','nota')  
        VALUES (?,?,?);
        `, [1,50.00,'lunes Pago 50 pesos']);
       tx.executeSql(`INSERT INTO abonos ('idVenta','abono','nota')  
        VALUES (?,?,?);
        `, [1,30.00,'lunes 20 Pago 30 pesos']);
       tx.executeSql(`INSERT INTO abonos ('idVenta','abono','nota')  
        VALUES (?,?,?);
        `, [1,20.00,'jueves 23 Pago 20 pesos']);               

        console.log("CREATE TABLE OK")                                                                  
        //tx.executeSql("INSERT INTO productos2 ('idProducto','nombre','descripcion','nota','foto','precio','precio_venta','cantidad','categoria','activo') VALUES (1,'prod 1','desc 1','nota','prod1.jpg',10,15,1,1);", []);
    });
  }
 
  resetProductos(){
    test_productos = [];
  }
  resetClientes(){
    clientes = [];
  }
  resetCategorias(){
    categorias = [];
  }

  test_getProd(inicio:number = 0, fin:number = 10): Promise<any>{
        return new Promise((resolve, reject) => {  
          this.isReady()
              .then(()=>{ 
                this.database.transaction( (tx: any) => { 
                    let sql = 'SELECT * FROM productos WHERE activo = 1 limit '+inicio+','+fin;
                    //console.log("test_getProd::2", sql);
                    tx.executeSql(sql, [], function(tx, response){
                      var len = response.rows.length;
                      //console.log("response executeSql:", response, "|#", response.rows.length)
                      console.log("test_getProd ---> response:", JSON.stringify(response.rows.item(1)), "|", response.rows[0])
                      if(!len){
                        reject(false);
                      }
                      for (var i = 0; i < len; i++) { 
                        //console.log("results::", response.rows.item(i))
                        test_productos.push( response.rows.item(i) );
                      }  
                      resolve(test_productos);
                    });
                });
              }).catch( (err)=>reject(false) ); 
        })
  }
  /* frm-producto.ts */
  test_getProdOne(idProducto): Promise<any>{
        return new Promise((resolve, reject) => {  
          this.isReady()
              .then(()=>{ 
                this.database.transaction( (tx: any) => { 
                    let sql = 'SELECT * FROM productos WHERE idProducto= '+idProducto;
                    //console.log("test_getProd sql 0:", sql)
                    tx.executeSql(sql, [], function(tx, response){
                      var len = response.rows.length;
                      //console.log("response executeSql:", response.rows, "|#", response.rows.length)

                      if(!len){
                        reject(false);
                      }

                      let getProdOne:any = [];
                      for (var i = 0; i < len; i++) { 
                        getProdOne.push( response.rows.item(i) );
                      }  
                      resolve(getProdOne);

                    });
                });
              }).catch( (err)=>reject(false) ); 
        })
  }  

  buscar_getProd(busqueda: string): Promise<any>{
        return new Promise((resolve, reject) => {  
          this.isReady()
              .then(()=>{ 
                this.database.transaction( (tx: any) => { 
                    let sql = 'SELECT * FROM productos WHERE activo = 1 and nombre like "%'+busqueda+'%"';
                    tx.executeSql(sql, [], function(tx, response){
                      var len = response.rows.length;
                      let busqueda_productos: Producto[] = []
                      //console.log(sql+" response executeSql:", response, "|#", response.rows.length)
                      if(!len){
                        reject(false);
                      }
                      for (var i = 0; i < len; i++) { 
                        //console.log("results::", response.rows.item(i))
                        busqueda_productos.push( response.rows.item(i) );
                      }  
                      resolve(busqueda_productos);
                    });
                });
              }).catch( (err)=>reject(false) ); 
        })
  }

  buscar_getUser(busqueda: string): Promise<any>{
        return new Promise((resolve, reject) => {  
          this.isReady()
              .then(()=>{ 
                this.database.transaction( (tx: any) => { 
                    let sql = 'SELECT * FROM clientes WHERE activo = 1 and nombre like "%'+busqueda+'%"';
                    tx.executeSql(sql, [], function(tx, response){
                      var len = response.rows.length;
                      let busqueda_clientes: Clientes[] = []
                      //console.log(sql+" response executeSql:", response, "|#", response.rows.length)
                      if(!len){
                        reject(false);
                      }
                      for (var i = 0; i < len; i++) { 
                        //console.log("results::", response.rows.item(i))
                        busqueda_clientes.push( response.rows.item(i) );
                      }  
                      resolve(busqueda_clientes);
                    });
                });
              }).catch( (err)=>reject(false) ); 
        })
  }  

  addProd(prod:Producto): Promise<any>{

    return new Promise((resolve, reject) => {  
      this.isReady()
      .then(()=>{
          this.database.transaction( (tx: any) => {  
               
            tx.executeSql(`INSERT INTO productos(nombre, descripcion, nota, precio, precio_venta, cantidad, categoria, activo) VALUES (?,?,?,?,?,?,?,?);`,
                                         [ prod.nombre, prod.descripcion, prod.nota, prod.precio, prod.precio_venta, prod.cantidad, prod.categoria, 1 ], function(tx, result){
              if(result.insertId){
                resolve(result);
              }else{
                reject(false);
              }
            });  
        })
      }).catch((err)=>{
          console.log("error detected creating tables", JSON.stringify( err ) );
          reject(false);
      }); 
    }) 
  }

  editProd(prod:Producto): Promise<any>{
    console.log("editProd", prod)
    return new Promise((resolve, reject) => {  
      this.isReady()
      .then(()=>{
          this.database.transaction( (tx: any) => {       
            try
            {
              tx.executeSql(`UPDATE productos SET nombre = ?, descripcion = ?, nota = ?, precio = ?, precio_venta = ?, cantidad = ?, categoria = ? WHERE idProducto=?`,
                             [ prod.nombre, prod.descripcion, prod.nota, prod.precio, prod.precio_venta, prod.cantidad, prod.categoria, prod.idProducto ], function(tx, result){

                if (result.rowsAffected) {
                    resolve(true);
                }else{
                  reject(false);
                }           
                
                 
              });  
            }catch(err){
                reject(false);
            }              
        })
      }).catch((err)=>{
          console.log("error detected creating tables", JSON.stringify( err ) );
          reject(false);
      }); 
    }) 
  }

  deleteProd(id:number){ 
    return new Promise((resolve, reject) => {  
      this.isReady()
      .then(()=>{
          this.database.transaction( (tx: any) => {       
            try
            {
              tx.executeSql(`UPDATE productos SET activo = ? WHERE idProducto=?`, [ 0, id ], function(tx, result){

                if (result.rowsAffected) {
                    resolve(true);
                }else{
                  reject(false);
                }            
                
                 
              });  
            }catch(err){
                reject(false);
            }              
        })
      }).catch((err)=>{
        console.log("error detected sql", JSON.stringify( err ) );
        reject(false);
      }); 
    })
  }


  test_getClientes(inicio:number = 0, fin:number = 10): Promise<any>{
        return new Promise((resolve, reject) => {  
          this.isReady()
              .then(()=>{ 
                this.database.transaction( (tx: any) => { 
                    let sql = 'SELECT * FROM clientes WHERE activo = 1 limit '+inicio+','+fin;
                    //console.log("test_getProd sql 0:", sql)
                    tx.executeSql(sql, [], function(tx, response){
                      
                      var len = response.rows.length;
                      //console.log("response executeSql:", response, "|#", response.rows.length)

                      if(!len){
                        reject(false);
                      }
                      for (var i = 0; i < len; i++) { 
                        //console.log("results::", response.rows.item(i))
                        clientes.push( response.rows.item(i) );
                      }  
                      resolve(clientes);
                    });
                });
              }).catch( (err)=>reject(false) ); 
        })
  }

  test_getClienteOne(idCliente): Promise<any>{
        return new Promise((resolve, reject) => {  
          this.isReady()
              .then(()=>{ 
                this.database.transaction( (tx: any) => { 
                    let sql = 'SELECT * FROM clientes WHERE idCliente= '+idCliente;
                    //console.log("test_getProd sql 0:", sql)
                    tx.executeSql(sql, [], function(tx, response){
                      var len = response.rows.length;
                      //console.log("response executeSql:", response.rows, "|#", response.rows.length)

                      if(!len){
                        reject(false);
                      }
                      let getClienteOne:any = [];
                      for (var i = 0; i < len; i++) { 
                        getClienteOne.push( response.rows.item(i) );
                      }  
                      resolve(getClienteOne);
                    });
                });
              }).catch( (err)=>reject(false) ); 
        })
  }  

  addCliente(cliente): Promise<any>{

    return new Promise((resolve, reject) => {  
      this.isReady()
      .then(()=>{
          this.database.transaction( (tx: any) => {  
            //let fecha = new Date();    
            tx.executeSql(`INSERT INTO clientes(nombre,direccion,telefono,foto,activo) VALUES (?,?,?,?,?);`,
                                         [ cliente.nombre, cliente.direccion, cliente.telefono, "", 1 ], function(tx, result){
             //console.log("result:", result)
              if(result.insertId){
                resolve(result);
              }else{
                reject(false);
              }
            });  
        })
      }).catch((err)=>{
        console.log("error detected sql", JSON.stringify( err ) );
        reject(false);
      }); 
    }) 
  }

  editCliente(cliente:Clientes): Promise<any>{
    
    return new Promise((resolve, reject) => {  
      this.isReady()
      .then(()=>{
          this.database.transaction( (tx: any) => {       
            try
            {
              tx.executeSql(`UPDATE clientes SET nombre = ?, direccion = ?, telefono = ? WHERE idCliente=?`,
                             [ cliente.nombre, cliente.direccion, cliente.telefono, cliente.idCliente ], function(tx, result){

                if (result.rowsAffected) {
                    resolve(true);
                }else{
                  reject(false);
                }           
                
                 
              });  
            }catch(err){
                reject(false);
            }              
        })
      }).catch((err)=>{
          console.log("error detected sql", JSON.stringify( err ) );
          reject(false);
      }); 
    }) 
  }

  deleteCliente(id: number){
    return new Promise((resolve, reject) => {  
      this.isReady()
      .then(()=>{
          this.database.transaction( (tx: any) => {       
            try
            {
              tx.executeSql(`UPDATE clientes SET activo = ? WHERE idCliente=?`, [ 0, id ], function(tx, result){

                if (result.rowsAffected) {
                    resolve(true);
                }else{
                  reject(false);
                }            
                
                 
              });  
            }catch(err){
                reject(false);
            }              
        })
      }).catch((err)=>{
        console.log("error detected sql", JSON.stringify( err ) );
        reject(false);
      }); 
    })
  }


  addVenta(idProducto, idCliente, precio, chkPago, pagoInicial): Promise<any>{
    //console.log("pagoInicial ", pagoInicial)
    return new Promise((resolve, reject) => {  
      this.isReady()
      .then(()=>{
          this.database.transaction( (tx: any) => {  
            let pagado = chkPago ? 1 : 0;

            if (pagado) {
              status = 'pagado';
            }
            else  
              status = 'pago pendiente';

            tx.executeSql(`INSERT INTO ventas('idProducto','idCliente', 'precio','status', 'pagado') VALUES (?,?,?,?,?);`,
                           [ idProducto, idCliente, precio, status, pagado], function(tx, result){
              if(result.insertId){
                resolve(result);  
              }else{
                reject(false);
              }
            });  
        })
      }).catch((err)=>{
          console.log("error detected creating tables", JSON.stringify( err ) );
          reject(false);
      }); 
    }) 
  }

  addAbono(idVenta, abono, nota, chkPago, restante): Promise<any>{
    //console.log("pagoInicial ", pagoInicial)
    return new Promise((resolve, reject) => {  
      this.isReady()
      .then(()=>{
          this.database.transaction( (tx: any) => {  
             tx.executeSql(`INSERT INTO abonos ('idVenta','abono','nota')  
              VALUES (?,?,?);`, [idVenta, abono, nota], function(tx, result){

                if(result.insertId){
                  //resolve(result);
                  let pagado = chkPago ? 1 : 0;

                  if (abono == restante){
                    pagado = 1; 
                    status = 'pagado';
                  }else{
                    pagado = 0; 
                    status = 'pago pendiente';
                  }

                  if (pagado) {
                    

                    tx.executeSql(`UPDATE ventas SET status=?, pagado = ? WHERE idVenta=?`,
                                   [ status, pagado, idVenta ], function(tx, result){
                        if (result.rowsAffected) {
                            resolve(true);
                        }else{
                          reject(false);
                        }
                    });                  
                  }else
                    resolve(result);
                }else{
                  reject(false);
                }
            });  
        })
      }).catch((err)=>{
          console.log("error detected creating tables", JSON.stringify( err ) );
          reject(false);
      }); 
    }) 
  }    

  ventasProduct(idProducto){
    return new Promise((resolve, reject) => {  
      this.isReady()
      .then(()=>{
          this.database.transaction( (tx: any) => {  
            tx.executeSql(`SELECT * FROM ventas WHERE idProducto = ?`, [ idProducto ], function(tx, result){

             
              resolve(result.rows.length);

            });  
        })
      }).catch((err)=>{
          console.log("error detected creating tables", JSON.stringify( err ) );
          reject(false);
      }); 
    }) 
  }

  getVentasProd(idProducto): Promise<any>{
      //console.log("getVentasProd ", idProducto)
        return new Promise((resolve, reject) => {  
          this.isReady()
              .then(()=>{ 
                this.database.transaction( (tx: any) => { 
                     
                    //console.log("test_getProd sql 0:", sql)
                    //select c.nombre, v.precio, v.status from ventas v, clientes c where c.idCliente = v.idCliente and v.idProducto=1
                    tx.executeSql(`select c.nombre, v.idVenta, v.precio, v.status, v.fecha
                                   from ventas v, clientes c 
                                   where c.idCliente = v.idCliente and v.idProducto=?`, [idProducto], function(tx, response){
                      var len = response.rows.length;
                      //console.log("response executeSql:", response.rows, "|#", response.rows.length)

                      if(!len){
                        reject(false);
                      }

                      let ventasProd:any = [];
                      for (var i = 0; i < len; i++) { 
                        ventasProd.push( response.rows.item(i) );
                      }  
                      resolve(ventasProd);

                    });
                });
              }).catch( (err)=>reject(false) ); 
        })
  } 

// Regresa las ventas con status pendientes para la pantalla Home
  getVentasProdListStatus(status:string): Promise<any>{
      //console.log("getVentasProd ", idProducto)
        return new Promise((resolve, reject) => {  
          this.isReady()
              .then(()=>{ 
                this.database.transaction( (tx: any) => { 
                     
                    //console.log("test_getProd sql 0:", sql)
                    //select c.nombre, v.precio, v.status from ventas v, clientes c where c.idCliente = v.idCliente and v.idProducto=1
                    tx.executeSql(` select count(v.idVenta) total, p.nombre, p.foto, p.idProducto
                                    from ventas v, productos p 
                                    where p.idProducto = v.idProducto AND v.status=?
                                    group by v.idProducto `, [status], function(tx, response){
                      var len = response.rows.length;
                      //console.log("response getVentasProdPendientes:", response.rows, "|#", response.rows.length)

                      if(!len){
                        reject(false);
                      }
                      let ventasProdPendientes:any = [];
                      for (var i = 0; i < len; i++) { 
                        ventasProdPendientes.push( response.rows.item(i) );
                      }  
                      resolve(ventasProdPendientes);

                    });
                });
              }).catch( (err)=>reject(false) ); 
        })
  } 
  getVentasStatus(status:string): Promise<any>{
     // console.log("getVentasProd ---> ", status)
        return new Promise((resolve, reject) => {  
          this.isReady()
              .then(()=>{ 
                this.database.transaction( (tx: any) => { 
                     
                    //console.log("test_getProd sql 0:", sql)
                    //select c.nombre, v.precio, v.status from ventas v, clientes c where c.idCliente = v.idCliente and v.idProducto=1
                    tx.executeSql(`select count(*) total from ventas where status=?`, [status], function(tx, response){
                      var len = response.rows.length;

                      if(!len){ 
                        resolve(false);
                      }
                      console.log("getVentasProd ---> response executeSql:", JSON.stringify(response.rows.item(0)), "|", response.rows.item(0).total)
                      resolve(response.rows.item(0).total);
                    });
                });
              }).catch( (err)=>reject(false) ); 
        })
  }   

  getAbonos(idVenta){
    return new Promise((resolve, reject) => {  
      this.isReady()
      .then(()=>{
          this.database.transaction( (tx: any) => {  
            tx.executeSql(`SELECT * FROM abonos WHERE idVenta = ?`, [ idVenta ], function(tx, response){
                    
                      var len = response.rows.length;
                    /*  
                      if(!len){
                        resolve(true);
                      }
                    */
                      let abonos:any = [];
                      for (var i = 0; i < len; i++) { 
                        abonos.push( response.rows.item(i) );
                      }  
                      resolve(abonos);       
            });  
        })
      }).catch((err)=>{
          console.log("error detected creating tables", JSON.stringify( err ) );
          reject(false);
      }); 
    }) 
  }


  test_getCategorias(inicio:number = 0, fin:number = 10): Promise<any>{
        return new Promise((resolve, reject) => {  
          this.isReady()
              .then(()=>{ 
                this.database.transaction( (tx: any) => { 
                    let sql = 'SELECT * FROM categorias WHERE activo = 1 limit '+inicio+','+fin;
                    //console.log("test_getProd sql 0:", sql)
                    tx.executeSql(sql, [], function(tx, response){
                      
                      var len = response.rows.length;
                      //console.log("response executeSql:", response, "|#", response.rows.length)

                      if(!len){
                        reject(false);
                      }
                      for (var i = 0; i < len; i++) { 
                        //console.log("results::", response.rows.item(i))
                        categorias.push( response.rows.item(i) );
                      }  
                      resolve(categorias);
                    });
                });
              }).catch( (err)=>reject(false) ); 
        })
  }
  addCategoria(nombre:string): Promise<any>{
    //console.log("pagoInicial ", pagoInicial)
    return new Promise((resolve, reject) => {  
      this.isReady()
      .then(()=>{
          this.database.transaction( (tx: any) => {  

            tx.executeSql(`INSERT INTO categorias('nombre', 'activo') VALUES (?,?);`, [ nombre, 1 ], function(tx, result){
              if(result.insertId){
                resolve(result);  
              }else{
                reject(false);
              }
            });  
        })
      }).catch((err)=>{
          console.log("error detected creating tables", JSON.stringify( err ) );
          reject(false);
      }); 
    }) 
  }  












  private isReady(){ 
    return new Promise((resolve, reject) =>{
      //if dbReady is true, resolve
      if(this.dbReady.getValue()){
        resolve();
      }
      //otherwise, wait to resolve until dbReady returns true
      else{
        this.dbReady.subscribe((ready)=>{
          if(ready){ 
            resolve(); 
          }
        });
      }  
    })
  }

  getLists(){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql("SELECT * from productos", [])
      .then((data)=>{
        let lists = [];
        for(let i=0; i<data.rows.length; i++){
          lists.push(data.rows.item(i));
        }
        return lists;
      })
    })

  }



  getList(id:number){ 
    return this.isReady()
    .then(()=>{
      return this.database.executeSql(`SELECT * FROM productos WHERE idProducto = ${id}`, [])
      .then((data)=>{
        if(data.rows.length){
          return data.rows.item(0);
        }
        return null;
      })
    })  
  }
  

  getTodosFromList(listId:number){ 
  return this.isReady()
    .then(()=>{
      return this.database.executeSql(`SELECT * from todo WHERE listId = ${listId}`, [])
            .then((data)=>{
              let todos = [];
              for(let i=0; i<data.rows.length; i++){
                let todo = data.rows.item(i);
                //doble negación (!!) para convertir enteros 0/1 a auténticos booleanos. 
                todo.isImportant = !!todo.isImportant;
                todo.isDone = !!todo.isDone;
                todos.push(todo);
              }
              return todos;
            })
    })
  }

  addTodo(description:string, isImportant:boolean, isDone:boolean, listId:number){ 
    return this.isReady()
    .then(()=>{
      return this.database.executeSql(`INSERT INTO todo 
        (description, isImportant, isDone, listId) VALUES (?, ?, ?, ?);`, 
        //cast booleans to binary numbers        
        [description, isImportant?1:0, isDone?1:0, listId]);
    });
  }

  modifyTodo(description:string, isImportant:boolean, isDone:boolean, id:number){ 
    return this.isReady()
    .then(()=>{
      return this.database.executeSql(`UPDATE todo 
        SET description = ?, 
            isImportant = ?,
            isDone = ? 
        WHERE id = ?`, 
        //cast booleans to binary numbers
        [description, isImportant?1:0, isDone?1:0, id]);
    }); 
  }
 

}
