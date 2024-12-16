from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.templating import Jinja2Templates
from .routers import vehicles, users, employees, clients
from fastapi.staticfiles import StaticFiles

app = FastAPI()

templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
async def get_form(request: Request):
    return templates.TemplateResponse("vehiculos/registrarVehiculo.html", {"request": request})

@app.get("/vehicles/list", response_class=HTMLResponse)
async def get_lista_vehiculos(request: Request):
    return templates.TemplateResponse("vehiculos/listarVehiculos.html", {"request": request})

@app.get("/vehicles/update", response_class=HTMLResponse)
async def get_update_vehiculo(request: Request):
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
async def get_register_empleado(request: Request):
    return templates.TemplateResponse("usuarios/registrarUsuario.html", {"request": request})

@app.get("/employees/list", response_class=HTMLResponse)
async def get_listar_empleados(request: Request):
    return templates.TemplateResponse("usuarios/listarUsuarios.html", {"request": request})

# Incluir las rutas de los módulos
app.include_router(vehicles.router, prefix="/vehicles", tags=["Vehicles"])
app.include_router(users.router, prefix="/users", tags=["Usuarios"])
app.include_router(employees.router, prefix="/employees", tags=["Empleados"])
app.include_router(clients.router, prefix="/clients", tags=["Clientes"])
