from fastapi import FastAPI, Request, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.templating import Jinja2Templates
from .routers import vehicles, users, employees, clients
from fastapi.staticfiles import StaticFiles
from fastapi.security import OAuth2PasswordBearer
from utils.auth import verify_token
from routers.auth_routes import router as auth_router

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Función para obtener el usuario actual
def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return payload

# Función para verificar el tipo de usuario (empleado o cliente)
def verify_user_role(user: dict, role: int):
    if user["tipo"] != role:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this resource",
        )

# Redirección inicial
@app.get("/", include_in_schema=False)
async def home():
    return RedirectResponse("/enlaces")

@app.get("/enlaces", response_class=HTMLResponse)
async def get_form(request: Request):
    return templates.TemplateResponse("listaEnlaces.html", {"request": request})

# Vehículos
@app.get("/vehicles/register", response_class=HTMLResponse)
async def get_form(request: Request, current_user: dict = Depends(get_current_user)):
    verify_user_role(current_user, 1)
    return templates.TemplateResponse("vehiculos/registrarVehiculo.html", {"request": request})

@app.get("/vehicles/list", response_class=HTMLResponse)
async def get_lista_vehiculos(request: Request, current_user: dict = Depends(get_current_user)):
    verify_user_role(current_user, 1)
    return templates.TemplateResponse("vehiculos/listarVehiculos.html", {"request": request})

@app.get("/vehicles/update", response_class=HTMLResponse)
async def get_update_vehiculo(request: Request, current_user: dict = Depends(get_current_user)):
    verify_user_role(current_user, 1)
    return templates.TemplateResponse("vehiculos/updateVehiculo.html", {"request": request})

# Clientes
@app.get("/clients/register", response_class=HTMLResponse)
async def get_register_usuario(request: Request):
    return templates.TemplateResponse("usuarios/registrarUsuario.html", {"request": request})

@app.get("/clients/list", response_class=HTMLResponse)
async def get_listar_usuarios(request: Request):
    return templates.TemplateResponse("usuarios/listarUsuarios.html", {"request": request})

@app.get("/users/update", response_class=HTMLResponse)
async def get_update_usuario(request: Request):
    return templates.TemplateResponse("usuarios/updateUsuario.html", {"request": request})

# Empleados
@app.get("/employees/register", response_class=HTMLResponse)
async def get_register_empleado(request: Request,current_user: dict = Depends(get_current_user)):
    verify_user_role(current_user, 1)
    return templates.TemplateResponse("usuarios/registrarUsuario.html", {"request": request})

@app.get("/employees/list", response_class=HTMLResponse)
async def get_listar_empleados(request: Request, current_user: dict = Depends(get_current_user)):
    verify_user_role(current_user, 1)
    return templates.TemplateResponse("usuarios/listarUsuarios.html", {"request": request})

# Incluir las rutas de los módulos
app.include_router(vehicles.router, prefix="/vehicles", tags=["Vehicles"])
app.include_router(users.router, prefix="/users", tags=["Usuarios"])
app.include_router(employees.router, prefix="/employees", tags=["Empleados"])
app.include_router(clients.router, prefix="/clients", tags=["Clientes"])
app.include_router(auth_router)