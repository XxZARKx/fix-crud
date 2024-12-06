from pydantic import BaseModel, ConfigDict
from typing import Optional


class VehicleBase(BaseModel):
    marca: str
    modelo: str
    placa: str
    matricula: str
    estado: str


class VehicleCreate(VehicleBase):
    pass


class Vehicle(VehicleBase):
    id: int

    # Cambio importante para Pydantic v2
    model_config = ConfigDict(from_attributes=True)


""" usuario """
class UsuarioBase(BaseModel):
    nombre: str
    correo: str
    contraseña: str
    dni: int
    tipo: int = 2  # Por defecto tipo cliente

class UsuarioCreate(UsuarioBase):
    pass

class Usuario(UsuarioBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class UsuarioUpdate(BaseModel):
    nombre: Optional[str]
    correo: Optional[str]
    contraseña: Optional[str]
