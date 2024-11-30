from pydantic import BaseModel


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

    class Config:
        orm_mode = True
