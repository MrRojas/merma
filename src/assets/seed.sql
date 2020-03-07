PRAGMA foreign_keys = 1;
CREATE TABLE IF NOT EXISTS producto(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT);
CREATE TABLE IF NOT EXISTS usuario(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT);
CREATE TABLE IF NOT EXISTS sector(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT);
CREATE TABLE IF NOT EXISTS unidad_medida(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT);
CREATE TABLE IF NOT EXISTS turno(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT);
CREATE TABLE IF NOT EXISTS tipo(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT);
CREATE TABLE IF NOT EXISTS motivo(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT);

CREATE TABLE IF NOT EXISTS merma (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    producto_id INTEGER,
    sector_id INTEGER,
    unidad_medida_id INTEGER,
    turno_id INTEGER,
    tipo_id INTEGER,
    motivo_id INTEGER,
    fecha DATETIME,
    observaciones TEXT,
    cantidad INTEGER,
    codigo_contenido INTEGER,
    codigo_vacio INTEGER,

    FOREIGN KEY(usuario_id) REFERENCES usuario(id),
    FOREIGN KEY(producto_id) REFERENCES producto(id),
    FOREIGN KEY(unidad_medida_id) REFERENCES unidad_medida(id),
    FOREIGN KEY(turno_id) REFERENCES turno(id),
    FOREIGN KEY(tipo_id) REFERENCES tipo(id),
    FOREIGN KEY(motivo_id) REFERENCES motivo(id),
    FOREIGN KEY(sector_id) REFERENCES sector(id)

);
