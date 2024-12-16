from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base
from sqlalchemy.orm import relationship


class Vehiculo(Base):
    __tablename__ = "vehiculo"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    marca = Column(String(80), nullable=False)
    modelo = Column(String(80), nullable=False)
    placa = Column(String(10), nullable=False, unique=True)
    matricula = Column(String(30), nullable=False)
    estado = Column(String(20), nullable=False)


class RolUsuario(Base):
    __tablename__ = "rol_usuario"

    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String(50), nullable=False)

    # Relación con la tabla 'usuario'
    usuarios = relationship("Usuario", back_populates="tipo_rol")


class Usuario(Base):
    __tablename__ = "usuario"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(70), nullable=False)
    correo = Column(String(255), nullable=False, unique=True)
    contraseña = Column(String(255), nullable=False)
    dni = Column(Integer, unique=True)
    tipo = Column(Integer, ForeignKey("rol_usuario.id"))  # Relación con rol_usuario

    # Relación con RolUsuario
    tipo_rol = relationship("RolUsuario", back_populates="usuarios")