from pydantic import BaseModel, ConfigDict


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
