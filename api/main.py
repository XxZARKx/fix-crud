from fastapi import FastAPI, Form, Request, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas
from database import (
    engine,
    SessionLocal,
)
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

# Crear las tablas en la base de datos
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir solicitudes desde cualquier origen
    allow_credentials=True,
    allow_methods=["*"],  # Permitir cualquier método (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permitir cualquier encabezado
)

templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")


        
# Redirección inicial a la página de registro
@app.get("/", include_in_schema=False)
async def home():
    return RedirectResponse("/register")

@app.get("/vehiculos/register", response_class=HTMLResponse)
async def get_form(request: Request):
    return templates.TemplateResponse("registrarVehiculo.html", {"request": request})


@app.get("/vehiculos/list", response_class=HTMLResponse)
async def get_lista_vehiculos(request: Request):
    return templates.TemplateResponse("listarVehiculos.html", {"request": request})


@app.get("/vehiculos/update", response_class=HTMLResponse)
async def get_update_vehiculo(request: Request):
    return templates.TemplateResponse("updateVehiculo.html", {"request": request})

""" usuarios """
@app.get("/usuarios/register", response_class=HTMLResponse)
async def get_register_usuario(request: Request):
    return templates.TemplateResponse("registrarUsuario.html", {"request": request})

@app.get("/usuarios/list", response_class=HTMLResponse)
async def get_listar_usuarios(request: Request):
    return templates.TemplateResponse("listarUsuarios.html", {"request": request})

@app.get("/usuarios/update", response_class=HTMLResponse)
async def get_update_usuario(request: Request):
    return templates.TemplateResponse("updateUsuario.html", {"request": request})

# Dependencia para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Crear un nuevo vehículo
@app.post("/vehicles/", response_model=schemas.Vehicle)
def create_vehicle(vehicle: schemas.VehicleCreate, db: Session = Depends(get_db)):
    db_vehicle = models.Vehiculo(**vehicle.model_dump())
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle


# Obtener todos los vehículos
@app.get("/vehicles/", response_model=list[schemas.Vehicle])
def read_vehicles(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(models.Vehiculo).offset(skip).limit(limit).all()


# Obtener un vehículo por ID
@app.get("/vehicles/{vehicle_id}", response_model=schemas.Vehicle)
def read_vehicle(vehicle_id: int, db: Session = Depends(get_db)):
    db_vehicle = (
        db.query(models.Vehiculo).filter(models.Vehiculo.id == vehicle_id).first()
    )
    if not db_vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return db_vehicle


# Actualizar un vehículo
@app.put("/vehicles/{vehicle_id}", response_model=schemas.Vehicle)
def update_vehicle(
    vehicle_id: int, vehicle: schemas.VehicleCreate, db: Session = Depends(get_db)
):
    db_vehicle = (
        db.query(models.Vehiculo).filter(models.Vehiculo.id == vehicle_id).first()
    )
    if not db_vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    # Cambio a model_dump()
    vehicle_data = vehicle.model_dump()
    for key, value in vehicle_data.items():
        setattr(db_vehicle, key, value)

    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle


# Eliminar un vehículo
@app.delete("/vehicles/{vehicle_id}")
def delete_vehicle(vehicle_id: int, db: Session = Depends(get_db)):
    db_vehicle = (
        db.query(models.Vehiculo).filter(models.Vehiculo.id == vehicle_id).first()
    )
    if not db_vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    db.delete(db_vehicle)
    db.commit()
    return {"message": "Vehicle deleted successfully"}





""" CRUD USUARIO """
# Crear un nuevo usuario
@app.post("/usuarios/", response_model=schemas.Usuario)
def create_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = models.Usuario(**usuario.model_dump())
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

# Obtener todos los usuarios
@app.get("/usuarios/", response_model=list[schemas.Usuario])
def read_usuarios(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(models.Usuario).offset(skip).limit(limit).all()

# Obtener un usuario por ID
@app.get("/usuarios/{usuario_id}", response_model=schemas.Usuario)
def read_usuario(usuario_id: int, db: Session = Depends(get_db)):
    db_usuario = db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()
    if not db_usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return db_usuario

# Actualizar un usuario
@app.put("/usuarios/{usuario_id}", response_model=schemas.Usuario)
def update_usuario(
    usuario_id: int, usuario: schemas.UsuarioUpdate, db: Session = Depends(get_db)
):
    db_usuario = db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()
    if not db_usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Actualizar solo los campos proporcionados
    for key, value in usuario.model_dump(exclude_unset=True).items():
        setattr(db_usuario, key, value)

    db.commit()
    db.refresh(db_usuario)
    return db_usuario

# Eliminar un usuario
@app.delete("/usuarios/{usuario_id}")
def delete_usuario(usuario_id: int, db: Session = Depends(get_db)):
    db_usuario = db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()
    if not db_usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    db.delete(db_usuario)
    db.commit()
    return {"message": "Usuario eliminado exitosamente"}
