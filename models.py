from sqlalchemy import Column, Integer, String
from database import Base


class Vehiculo(Base):
    __tablename__ = "vehiculo"  # Nombre de la tabla en tu base de datos

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    marca = Column(String(80), nullable=False)
    modelo = Column(String(80), nullable=False)
    placa = Column(String(10), nullable=False, unique=True)
    matricula = Column(String(30), nullable=False)
    estado = Column(String(20), nullable=False)
